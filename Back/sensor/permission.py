from rest_framework.permissions import BasePermission

class IsAdm(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and getattr(user, 'type_user', None) == 'A'