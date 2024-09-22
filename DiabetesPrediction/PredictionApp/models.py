from django.db import models

# Create your models here.
class contactEnquiry(models.Model):
    name=models.CharField(max_length=50)
    phone=models.CharField(max_length=10)
    email=models.EmailField(max_length=100)
    message=models.TextField(max_length=500)
