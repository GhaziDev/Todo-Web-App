from django.contrib import admin
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
		list_display = ('id', 'date', 'description', 'is_completed', 'published')

admin.site.register(Todo, TodoAdmin)

# Register your models here.
