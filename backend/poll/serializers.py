from .models import PollInfo
from rest_framework import serializers


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollInfo
        fields = [
            'poll_id',
            'begin_at',
            'end_at',
            'nbr_voices',
            'logins_voters',
            'logins_cands',
        ]

# 수정 필요: poll_id 리스트를 저장할 field 추가(SerializerMethodField)
class DeleteMultiPollSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollInfo
        fields = [
            'poll_id'
        ]
