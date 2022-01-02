from django.contrib import admin
from .models import UserInfo


@admin.register(UserInfo)
class LoginUserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'login_id',
        'is_staff',
        'group',
        'anonymize_date',
    )
    search_fields = (
        'id',
        'login_id',
        'group',
    )
