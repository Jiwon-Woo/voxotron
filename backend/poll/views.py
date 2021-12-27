import os

from .serializers import PollSerializer
from .models import PollInfo
from django.shortcuts import redirect, render
from rest_framework import generics, response, status

import requests


def replaceValue(key, value):
    pre_value = value.__getitem__(key)
    value.__setitem__(key, pre_value.replace('\r\n', '#'))
    return value


def modifyValue(request):
    copy_value = request.data.copy()
    next_value = replaceValue("logins_voters", copy_value)
    next_value = replaceValue("logins_cands", next_value)
    return next_value


class PollListApi(generics.ListCreateAPIView):
    queryset = PollInfo.objects.all()
    serializer_class = PollSerializer

    def get(self, request):
        queryset = self.queryset.all() # invalid first, last option
        serializer = PollSerializer(queryset, many=True)
        if not len(serializer.data):
            return response.Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
        return response.Response(serializer.data[0])

    def post(self, request):
        value = modifyValue(request)
        serializer = PollSerializer(data=value)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

class PollDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = PollInfo.objects.all()
    serializer_class = PollSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=modifyValue(request), partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return response.Response(serializer.data)


def GetCode(request):
    authorize_api = os.environ.get("AUTHORIZE_URL")
    client_id = os.environ.get("CLIENT_ID")
    redirect_uri = os.environ.get("REDIRECT_URI")
    return redirect(f'{authorize_api}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code')


def LoginApi(request):
    code = request.get_full_path().replace('/?code=', '')
    if code == '':
        context = {
            'id': None,
            'login': None,
            'email': None
        }
        return render(request, 'poll/login.html', context)
    data = {
        'grant_type': 'authorization_code',
        'client_id': os.environ.get("CLIENT_ID"),
        'client_secret': os.environ.get("CLIENT_SECRET"),
        'code': code,
        'redirect_uri': os.environ.get("REDIRECT_URI")
    }

    token = requests.post(os.environ.get('TOKEN_URL'), data=data)
    token_to_json = token.json()
    access_token = token_to_json.get("access_token")
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    info = requests.get(os.environ.get('INFO_URL'), headers=headers)
    info_to_json = info.json()
    id = info_to_json.get("id")
    login = info_to_json.get("login")
    email = info_to_json.get("email")
    image_url = info_to_json.get("image_url")
    user_data = {
        'id': id,
        'login': login,
        'email': email,
        'image_url': image_url
    }
    return render(request, 'poll/login.html', user_data)
