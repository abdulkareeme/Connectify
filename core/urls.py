from django.urls import path
from . import views
from knox.views import LogoutView


urlpatterns = [
    path('login/', views.login_api, name='login_api'),
    path('register/', views.RegisterUser.as_view(), name='register_api'),
    # path('users', views.ListUsers.as_view(), name='list_users'),
    path('user/<str:username>', views.RetrieveUser.as_view(), name='retrieve_user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset/', views.PasswordResetAPIView.as_view(),
         name='password_reset'),
    path('update-profile', views.UpdateUser.as_view(), name='update_profile'),
    path('confirm-email', views.UserConfirmMessage.as_view(), name='confirm_email'),
    path('resend-email-code', views.ResendEmailMessage.as_view(),
         name='resend_email_code'),
    path('send-forget-password-code', views.SendForgetPasswordCode.as_view(),
         name='send_forget_password_code'),
    path('forget-password-reset', views.ForgetPasswordReset.as_view(),
         name='forget_password_reset'),
    path('check-forget_password-code', views.CheckForgetPasswordCode.as_view(
    ), name='check_forget_password_code'),
    path('update-user-photo', views.UpdateUserPhoto.as_view(),
         name='update_user_photo'),
]
