from rest_framework import permissions

class IsSupplier(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.supplier == request.user


class IsCustomer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.account_type == 'admin'
