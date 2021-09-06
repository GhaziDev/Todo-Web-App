from django.db import models


class Todo(models.Model):
	date = models.CharField(max_length=100)
	description = models.TextField()
	is_completed = models.BooleanField(default=False)
	published = models.DateField(auto_now=True)






# Create your models here.
