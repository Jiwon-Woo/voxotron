from .serializers import PollSerializer
from .models import PollInfo
from rest_framework import generics, response, status


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
