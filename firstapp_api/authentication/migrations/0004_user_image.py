# Generated by Django 4.2.1 on 2023-09-03 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to='authentication/images/'),
        ),
    ]
