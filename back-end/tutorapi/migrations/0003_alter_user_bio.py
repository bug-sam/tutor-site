# Generated by Django 3.2.6 on 2021-08-23 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorapi', '0002_auto_20210823_2049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bio',
            field=models.CharField(max_length=240, null=True),
        ),
    ]