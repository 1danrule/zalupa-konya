from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import AppUser


@admin.register(AppUser)
class AppUserAdmin(UserAdmin):
    model = AppUser
    list_display = ("id", "email", "display_name", "is_active", "is_staff")
    ordering = ("id",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional info",
            {"fields": ("display_name",)},
        ),
    )