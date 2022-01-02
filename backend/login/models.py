from django.db import models


class UserInfo(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    login_id = models.TextField(null=False)
    is_staff = models.BooleanField(null=False)
    group = models.TextField(null=False)
    anonymize_date = models.DateTimeField(null=False)