from django.db import models


class PollInfo(models.Model):
    poll_id = models.AutoField(primary_key=True)
    begin_at = models.DateTimeField(null=False)
    end_at = models.DateTimeField(null=False)
    nbr_voices = models.PositiveIntegerField(null=True)
    logins_voters = models.TextField(null=False)
    logins_cands = models.TextField(null=False)
