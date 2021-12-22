from .serializers import PollSerializer
from .models import PollInfo
from rest_framework import generics, response, status


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
        serializer = PollSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
