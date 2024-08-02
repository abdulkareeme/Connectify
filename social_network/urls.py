# social_network/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
    path('posts/<int:post_id>/likes/', views.LikeListView.as_view(), name='like-list'),  # Like list view for a specific post
    path('likes/', views.LikeCreateView.as_view(), name='like-create'),  # Like create/unlike view
    path('follow/<str:username>/', views.FollowUserView.as_view(), name='follow-unfollow'),
    path('followers/', views.ListFollowersView.as_view(), name='followers-list'),
    path('following/', views.ListFollowingView.as_view(), name='following-list'),
    path('search/<str:content>/', views.SearchPostsView.as_view(), name='search-posts'),
    path('save-post/', views.SavePostView.as_view(), name='save-post'),
    path('unsave-post/', views.UnsavePostView.as_view(), name='unsave-post'),
    path('saved-posts/', views.ListSavedPostsView.as_view(), name='saved-posts'),
    path('approve-follow/<str:username>/', views.ApproveFollowRequestView.as_view(), name='approve-follow-request'),
]
