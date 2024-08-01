# social_network/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
    path('likes/', views.LikeListCreateView.as_view(), name='like-list-create'),
    path('likes/<int:pk>/', views.LikeDetailView.as_view(), name='like-detail'),
]
