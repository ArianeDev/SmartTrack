from django.urls import path
from .views import (
    Login,
    UploadFileView
)

urlpatterns = [
    path('upload/', UploadFileView.as_view(), name='upload_file'),
    path('login/', Login.as_view(), name='login'),
]