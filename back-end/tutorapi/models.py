from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=60, primary_key=True)
    password = models.CharField(max_length=60)
    email = models.CharField(max_length=60)
    bio = models.CharField(max_length=240, null=True)

    def check_password(self, password):
        print("here")
        print(self.password)
        return self.password == password

    def __str__(self):
        return self.username



class TutorRequest(models.Model):
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=240)
    creator = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


