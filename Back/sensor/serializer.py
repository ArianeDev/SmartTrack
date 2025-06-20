from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Sensor, Ambient, History, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'date_birth', 'type_user', 'password']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    # create password 
    def create(self, validated_data):
        password = validated_data.pop('password')  
        user = User(**validated_data)  
        user.set_password(password)    
        user.save()
        return user

class SensorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

class AmbientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambient
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.type_sensors', read_only=True)
    ambient_name = serializers.CharField(source='ambient.description', read_only=True)

    class Meta:
        model = History
        fields = ['id', 'sensor', 'sensor_name', 'ambient', 'ambient_name', 'value', 'timestamp']

# Login with email and password
class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        self.user = authenticate(**credentials)

        if self.user is None:
            raise serializers.ValidationError("Email ou senha inválidos.")
        
        data = super().validate(attrs)
        data['user'] = {
            'username': self.user.username,
            'email': self.user.email,
            'type_user': self.user.type_user,
        }
        return data