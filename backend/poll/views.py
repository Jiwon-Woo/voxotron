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


class PollListApi(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = PollInfo.objects.all()
    serializer_class = PollSerializer

    def post(self, request):
        value = modifyValue(request)
        serializer = PollSerializer(data=value)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.filter_queryset(self.get_queryset())
        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)


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
