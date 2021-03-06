from django.contrib import admin
from .models import PollInfo


@admin.register(PollInfo)
class CreatePollAdmin(admin.ModelAdmin):
    list_display = (
        'poll_id',
        'begin_at',
        'end_at',
        'nbr_voices',
        'logins_voters',
        'logins_cands',
    )
    search_fields = (
        'poll_id',
        'begin_at',
        'end_at',
        'nbr_voices',
        'logins_voters',
        'logins_cands',
    )
