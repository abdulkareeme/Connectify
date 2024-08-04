from django.urls import path
from . import  views
from knox.views import LogoutView

app_name="core"
urlpatterns = [
    path('login2-without-2factor', views.login_api2, name='login_api'),
    path('register', views.register_api, name='register_api'),
#     path('logout',LogoutView.as_view() , name='logout'),
    path('list-users',views.ListUser.as_view(), name='users_list'),
    path('login-page',views.login, name="login_page"),
    path("",views.user_list, name="list_users"),
    path('signup' , views.signup, name='signup'),
    # path('confirm-email/<str:uidb64>/<str:token>/',
    #      views.UserConfirmEmailView.as_view(), name='confirm_email'),

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
