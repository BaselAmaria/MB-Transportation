from rest_framework import permissions

class IsAdminOrSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow delete permissions only to admin users or the user themselves
        return request.user.is_superuser or obj == request.user
