# Generated by Django 4.0 on 2022-01-10 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinfo',
            old_name='id',
            new_name='intra_id',
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='info_data',
            field=models.JSONField(null=True),
        ),
    ]
