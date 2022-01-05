from django.db import models


class UserInfo(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    login_id = models.TextField(null=False)
    is_staff = models.BooleanField(null=False)
    info_data = models.JSONField()
