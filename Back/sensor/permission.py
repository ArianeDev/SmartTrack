from rest_framework.permissions import BasePermission

class IsAdm(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        print(f"User: {user} - Authenticated? {user.is_authenticated} - type_user: {getattr(user, 'type_user', None)}")
        return user.is_authenticated and getattr(user, 'type_user', None) == 'A'