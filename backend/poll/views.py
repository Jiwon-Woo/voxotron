import json
import os

from .serializers import PollSerializer, DeleteMultiPollSerializer
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
        return response.Response(serializer.data)

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


# 수정 필요
class DeleteMultiPollApi(generics.CreateAPIView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def destroy(self, request, *args, **kwargs):
    #     # serializer = DelSerializer
    #     print("1")
    #     print(">>>>>>", *args, " | ", **kwargs)
    #     instance = self.filter_queryset(self.get_queryset())
    #     print(instance)
    #     self.perform_destroy(instance)
    #     print("3")
    #     return response.Response(status=status.HTTP_204_NO_CONTENT)
