from .models import User,Sensor, Ambient, History
from .permission import IsAdm
from .serializer import SensorsSerializer, AmbientSerializer, HistorySerializer, UserSerializer
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
import pandas as pd

#  Upload CSV file

class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdm]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "Nenhum arquivo enviado"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_csv(file)
            # Columns CSV
            columns = {"sensor", "mac_address", "unidade_medida", "longitude", "latitude", "status"}

            if not columns.issubset(df.columns):
                return Response({"error": "Colunas inválidas no arquivo CSV"}, status=status.HTTP_400_BAD_REQUEST)
            
            data = [
                # Insert in the database
                Sensor(
                    type_sensors=row['sensor'],
                    mac_address=row['mac_address'],
                    unit_measure=row['unidade_medida'],
                    longitude=row['longitude'],
                    latitude=row['latitude'],
                    status=row['status']
                )

                for _, row in df.iterrows()
            ]
            Sensor.objects.bulk_create(data)
            return Response({"message": "Arquivo CSV processado com sucesso"}, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
# Login

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class Login(TokenObtainPairView):
    serializer_class = UserSerializer

# User methods

class User_GET_POST(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdm]

# Sensors methods

class SensorsPaginated(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class Sensors_GET_POST(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorsSerializer
    pagination_class = SensorsPaginated
    permission_classes = [IsAdm]

    def get_queryset(self):
        queryset = super().get_queryset()
        type_sensors = self.request.query_params.get('type_sensors')

        if type_sensors:
            queryset = queryset.filter(type_sensors=type_sensors)

        return queryset

class Sensors_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorsSerializer
    permission_classes = [IsAdm]