# Generated by Django 4.2.1 on 2023-09-09 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0002_alter_message_message_alter_message_opp_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='image',
            field=models.ImageField(null=True, upload_to='images/connection/tweet/'),
        ),
    ]
