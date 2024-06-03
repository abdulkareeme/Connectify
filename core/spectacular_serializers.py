from rest_framework import serializers
from .models import User

class  UserSpectacular(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['id','username','email','first_name','last_name',
                  'photo','birth_date','date_joined','gender','bio']

class LoginSpectacular(serializers.Serializer):
    user_info = UserSpectacular()
    token = serializers.CharField()


class UpdateProfileSpectacular(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['id','username','email','first_name','last_name',
                  'photo','birth_date','date_joined','gender','bio']
        

class ResendCodeEmailSpectacular(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
    )
class ConfirmCodeSpectacular(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
    )
    confirmation_code = serializers.CharField()


class ForgetPasswordResetSpectacular(serializers.Serializer):
    email = serializers.EmailField(required=True)
    forget_password_code = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2= serializers.CharField(required=True)

class CheckForgetPasswordSpectacular(serializers.Serializer):
    email = serializers.EmailField(required=True)
    forget_password_code = serializers.CharField(required=True)

class UpdateUserSpectacular(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['first_name','last_name','birth_date' , 'bio']

