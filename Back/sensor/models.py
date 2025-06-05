from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

TYPE_USER = (
    ('A', 'Administrador'),
)

TYPE_SENSORS = (
    ('T', 'Temperatura'),
    ('U', 'Umidade'),
    ('CP', 'Contador_pessoas'),
    ('L', 'Luminosidade'),
)

validate_phone = RegexValidator(
    regex=r'^\d({2}) \d{5}-\d{4}$',
    message="O número de telefone deve estar no formato: (XX) XXXXX-XXXX",
)
validate_macAddress = RegexValidator(
    regex=r'^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$',
    message="O endereço MAC deve estar no formato: XX:XX:XX:XX:XX:XX",
)
class User(AbstractUser):
    phone = models.CharField(max_length=14, blank=True, null=True, validators=[validate_phone])
    date_birth = models.DateField(blank=True, null=True)
    tipo_usuario = models.CharField(max_length=20, choices=TYPE_USER)

    def __str__(self):
        return self.username

class Sensors(models.Model):
    type_sensors = models.CharField(max_length=50, choices=TYPE_SENSORS, blank=False)
    mac_address = models.CharField(max_length=17, unique=True, blank=False, validators=[validate_macAddress])
    unit_measure = models.CharField(max_length=5, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    status = models.BooleanField(blank=False)

    def __str__(self):
        return self.mac_address

class Ambient(models.Model):
    sig = models.IntegerField(max_length=10, unique=True)
    description = models.CharField(max_length=50)
    ni = models.CharField(max_length=15, blank=False)
    responsible = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.description

class History(models.Model):
    sensor = models.ForeignKey(Sensors, on_delete=models.CASCADE)
    ambient = models.ForeignKey(Ambient, on_delete=models.CASCADE)
    value = models.FloatField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    # Perguntar se pode usar data e não inteiro

    class Meta:
        ordering = ['-date']  # Order by date descending