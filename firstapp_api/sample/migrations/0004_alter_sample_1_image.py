# Generated by Django 4.2.1 on 2023-09-09 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0003_sample_1_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sample_1',
            name='image',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]
