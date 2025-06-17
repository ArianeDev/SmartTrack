from django.urls import path
from .views import (
    Login, GetUser,
    UploadFile_Sensors, UploadFile_Ambient, UploadFile_History,
    ExportFile_Sensors, ExportFile_Ambient, ExportFile_History,
    User_GET_POST,
    Sensors_GET_POST, Sensors_GET_PUT_PATCH_DELETE,
    Ambient_GET_POST, Ambient_GET_PUT_PATCH_DELETE,
    History_GET_POST, History_GET_PUT_PATCH_DELETE
)

urlpatterns = [
    path('login/', Login.as_view(), name='login'), 
    path('user/', GetUser, name='data_user'),
    path('upload/sensors/', UploadFile_Sensors.as_view(), name='upload_file_sensors'),
    path('upload/ambient/', UploadFile_Ambient.as_view(), name='upload_file_ambient'),   
    path('upload/history/', UploadFile_History.as_view(), name='upload_file_history'),   
    path('users/', User_GET_POST.as_view(), name='user_list_create'),
    path('sensors/', Sensors_GET_POST.as_view(), name='sensors_list_create'),
    path('sensor/<int:pk>/', Sensors_GET_PUT_PATCH_DELETE.as_view(), name='sensors_detail'),
    path('ambients/', Ambient_GET_POST.as_view(), name='ambient_list_create'),
    path('ambient/<int:pk>/', Ambient_GET_PUT_PATCH_DELETE.as_view(), name='ambient_detail'),
    path('historys/', History_GET_POST.as_view(), name='history_list_create'),
    path('history/<int:pk>/', History_GET_PUT_PATCH_DELETE.as_view(), name='history_detail'),
    path('export/sensors/', ExportFile_Sensors.as_view(), name='export_file_sensors'),
    path('export/ambient/', ExportFile_Ambient.as_view(), name='export_file_ambient'),
    path('export/history/', ExportFile_History.as_view(), name='export_file_history'),
]