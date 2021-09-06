# Generated by Django 3.2.6 on 2021-08-28 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('is_completed', models.BooleanField(default=False)),
                ('published', models.DateField(auto_now=True)),
            ],
        ),
    ]
