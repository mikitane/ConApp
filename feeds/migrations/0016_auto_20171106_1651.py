# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-06 14:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0015_auto_20171103_1311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(blank=True, default='C:\\Users\\Miika\\Desktop\\ConversationApp\\conversationapp\\feeds\\media\\feeds/profile_image/1.png', upload_to='profile_image'),
        ),
    ]
