from rest_framework.permissions import BasePermission

class IsAdm(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        print(f"User: {user}, Type: {user.tipo_usuario}")
        return user.is_authenticated and user.tipo_usuario == 'A'