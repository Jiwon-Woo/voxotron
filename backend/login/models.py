from django.db import models

# 로그인한 유저(~/me)
class UserInfo(models.Model):
    intra_id = models.PositiveIntegerField(primary_key=True)
    login_id = models.CharField(null=False, max_length=16)
    is_staff = models.BooleanField(null=False)
    # info_data = models.JSONField(null=True)
