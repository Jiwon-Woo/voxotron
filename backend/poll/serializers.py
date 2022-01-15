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
