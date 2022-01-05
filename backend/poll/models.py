from django.db import models
from login.models import UserInfo


class PollInfo(models.Model):
    poll_id = models.AutoField(primary_key=True)
    begin_at = models.DateTimeField(null=False)
    end_at = models.DateTimeField(null=False)
    nbr_voices = models.PositiveIntegerField(null=True)
    logins_voters = models.ForeignKey(
        UserInfo,
        on_delete=models.CASCADE,
        related_name='logins_voters'
    )
    logins_cands = models.ForeignKey(
        UserInfo,
        on_delete=models.CASCADE,
        related_name='logins_cands'
    )