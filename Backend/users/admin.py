from allauth.account.admin import EmailAddressAdmin
from allauth.account.models import EmailAddress
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.sites.admin import SiteAdmin
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp, SocialToken, SocialAccount

from .forms import CustomUserChangeForm, CustomUserCreationForm


User = get_user_model()

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['__str__', 'email', 'phone', 'is_active', 'account_type', 'rating', 'date_joined']
    list_filter = ['is_staff', 'is_superuser', 'is_active']
    fieldsets = (
        ('Auth Info', {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'address', 'phone', 'account_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser',
                                    'is_active',
                                    'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'first_name', 'last_name', 'address', 'account_type',
                       'password1', 'password2')}
         ),
    )
    search_fields = ('email', 'first_name', 'last_name', 'address')
    ordering = ('email', )


admin.site.unregister(Site)
admin.site.unregister(EmailAddress)
admin.site.unregister(SocialToken)
admin.site.unregister(SocialApp)
admin.site.unregister(SocialAccount)


@admin.register(Site)
class SiteAdmin(SiteAdmin):

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        if Site.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


@admin.register(EmailAddress)
class EmailAddressAdmin(EmailAddressAdmin):
    list_display = ['__str__', 'user', 'verified']
    readonly_fields = ['primary']
