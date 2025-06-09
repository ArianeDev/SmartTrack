from django.urls import path
from .views import (
    Login,
    UploadFile_Sensors,
    User_GET_POST,
    Sensors_GET_POST, Sensors_GET_PUT_PATCH_DELETE,
    Ambient_GET_POST, Ambient_GET_PUT_PATCH_DELETE,
)

urlpatterns = [
    path('upload/', UploadFile_Sensors.as_view(), name='upload_file'),
    path('login/', Login.as_view(), name='login'),
    path('users/', User_GET_POST.as_view(), name='user_list_create'),
    # path('user/<int:pk>/', User_GET_PUT_PATCH_DELETE.as_view(), name='user_detail'),
    path('sensors/', Sensors_GET_POST.as_view(), name='sensors_list_create'),
    path('sensor/<int:pk>/', Sensors_GET_PUT_PATCH_DELETE.as_view(), name='sensors_detail'),
    path('ambients/', Ambient_GET_POST.as_view(), name='ambient_list_create'),
    path('ambient/<int:pk>/', Ambient_GET_PUT_PATCH_DELETE.as_view(), name='ambient_detail'),
]