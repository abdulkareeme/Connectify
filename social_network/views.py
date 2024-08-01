# social_network/views.py

from rest_framework import generics, permissions
from .models import Post, Comment, Like, Follower
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from django.db.models import Q

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            following = Follower.objects.filter(follower=user).values_list('user', flat=True)
            return Post.objects.filter(
                Q(user__is_private=False) |
                Q(user__in=following) |
                Q(user=user)
            ).order_by('-created_at')
        return Post.objects.filter(user__is_private=False).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            following = Follower.objects.filter(follower=user).values_list('user', flat=True)
            return Post.objects.filter(
                Q(user__is_private=False) |
                Q(user__in=following) |
                Q(user=user)
            )
        return Post.objects.filter(user__is_private=False)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

class LikeListCreateView(generics.ListCreateAPIView):
    queryset = Like.objects.all().order_by('-created_at')
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LikeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]
