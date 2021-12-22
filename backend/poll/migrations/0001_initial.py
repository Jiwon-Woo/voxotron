# Generated by Django 4.0 on 2021-12-22 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PollInfo',
            fields=[
                ('poll_id', models.AutoField(primary_key=True, serialize=False)),
                ('begin_at', models.DateTimeField()),
                ('end_at', models.DateTimeField()),
                ('nbr_voices', models.PositiveIntegerField(null=True)),
                ('login_voters', models.TextField()),
                ('login_cands', models.TextField()),
            ],
        ),
    ]
