from django.contrib import admin
from .models import UserInfo


@admin.register(UserInfo)
class LoginUserAdmin(admin.ModelAdmin):
    list_display = (
        'intra_id',
        'login_id',
        'is_staff',
        # 'info_data',
    )
    search_fields = (
        'intra_id',
        'login_id',
    )
