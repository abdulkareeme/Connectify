from django.db import models
from django.contrib.auth.models import AbstractUser

gender_choices = [('Male', 'Male'), ('Female', 'Female')]


class User(AbstractUser):
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(choices=gender_choices, max_length=10)
    photo = models.ImageField(
        upload_to='profile', max_length=100, blank=True, null=True)

    is_online = models.BooleanField(default=False)
    following = models.ManyToManyField("User", related_name="my_following", blank=True)
    friends = models.ManyToManyField("User", related_name='my_friends', blank=True)
    bio = models.CharField(max_length=1000 , null=True , blank=True)

    confirmation_tries = models.IntegerField(default=3, blank=True)
    next_confirm_try = models.DateTimeField(blank=True, null=True)
    confirmation_code = models.CharField(null=True, blank=True, max_length=6)

    resend_tries = models.IntegerField(default=3, blank=True)
    next_confirmation_code_sent = models.DateTimeField(blank=True, null=True)

    forget_confirmation_tries = models.IntegerField(default=3, blank=True)
    forget_next_confirm_try = models.DateTimeField(blank=True, null=True)
    forget_password_code = models.CharField(
        blank=True, null=True, max_length=6)
    
    is_private = models.BooleanField(default=False)


    def save(self, *args, **kwargs):
        if not self.photo:
            if self.gender == 'Male':
                self.photo.name = "profile/Male.jpg"
                self.photo.storage.url(self.photo.name)
            else:
                self.photo.name = "profile/Female.jpg"
                self.photo.storage.url(self.photo.name)
        super().save(*args, **kwargs)


