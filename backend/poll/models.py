from django.db import models
from login.models import UserInfo


class PollInfo(models.Model):
    poll_id = models.AutoField(primary_key=True)
    begin_at = models.DateTimeField(null=False)
    end_at = models.DateTimeField(null=False)
    nbr_voices = models.PositiveIntegerField(null=False)
    logins_voters = models.TextField() # 여러명 입력받는 용도
    logins_cands = models.TextField()
    users = models.ManyToManyField(UserInfo, through='PollAndUserRelationship')
    # users : UserInfo와 다대다 관계


class PollAndUserRelationship(models.Model):
    poll = models.ForeignKey('PollInfo', on_delete=models.CASCADE)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    role = models.BooleanField('IsVoter')
