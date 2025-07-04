from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Sensor, Ambient, History, User

class UserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            'fields': ('phone', 'date_birth', 'type_user')
        }),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ('phone', 'date_birth', 'type_user')
        }),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Sensor)
admin.site.register(Ambient)
admin.site.register(History)