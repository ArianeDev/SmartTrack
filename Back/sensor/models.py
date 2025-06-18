from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Choices

TYPE_USER = (
    ('A', 'Administrador'),
)

TYPE_SENSORS = (
    ('temperatura', 'Temperatura'),
    ('umidade', 'Umidade'),
    ('contador', 'Contador_pessoas'),
    ('luminosidade', 'Luminosidade'),
)

# Validators

validate_username = RegexValidator(
    regex=r'^[A-Za-z0-9À-ÿ]+(?: [A-Za-z0-9À-ÿ]+)*$',
    message="O nome de usuário pode conter letras, números e espaços, mas não pode começar ou terminar com espaço."
)
validate_email = RegexValidator(
    regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    message="Digite o email corretamente, deve conter letras minúsculas, números e ponto antes do @, seguido por um domínio.",
)
validate_phone = RegexValidator(
    regex=r'^\(\d{2}\)\d{5}-\d{4}$',
    message="O número de telefone deve estar no formato: (XX) XXXXX-XXXX",
)
validate_macAddress = RegexValidator(
    regex=r'^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$',
    message="O endereço MAC deve estar no formato: XX:XX:XX:XX:XX:XX",
)

# Models 

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, validators=[validate_username])
    email = models.EmailField(max_length=254, unique=True, validators=[validate_email])
    phone = models.CharField(max_length=14, blank=True, null=True, validators=[validate_phone])
    date_birth = models.DateField(blank=True, null=True)
    type_user = models.CharField(max_length=20, choices=TYPE_USER)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

class Sensor(models.Model):
    type_sensors = models.CharField(max_length=50, choices=TYPE_SENSORS, blank=False)
    mac_address = models.CharField(max_length=17, blank=False, validators=[validate_macAddress])
    unit_measure = models.CharField(max_length=5, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    status = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return self.type_sensors

class Ambient(models.Model):
    sig = models.IntegerField(unique=True)
    description = models.CharField(max_length=50)
    ni = models.CharField(max_length=15, blank=False)
    responsible = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.description

class History(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    ambient = models.ForeignKey(Ambient, on_delete=models.CASCADE)
    value = models.FloatField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def date(self):
        return self.timestamp.date()
    
    def time(self):
        return self.timestamp.time()