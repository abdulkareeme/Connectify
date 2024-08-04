# social_network/views.py

from rest_framework import generics, permissions
from .models import Post, Comment, Like, Follower ,SavedPost
from .serializers import PostSerializer, CommentSerializer, LikeSerializer , UserSerializer ,SavaPostSpectacular
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import PermissionDenied


@extend_schema(
    request=PostSerializer,
    summary="List/Create Post"
)
class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            following = Follower.objects.filter(follower=user ,is_approved= True).values_list('user', flat=True)
            return Post.objects.filter(
                Q(user__is_private=False) |
                Q(user__in=following) |
                Q(user=user)
            ).order_by('-created_at')
        return Post.objects.filter(user__is_private=False).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@extend_schema(
    request=PostSerializer,
    summary="Post Detail"
)
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            following = Follower.objects.filter(follower=user , is_approved= True).values_list('user', flat=True)
            return Post.objects.filter(
                Q(user__is_private=False) |
                Q(user__in=following) |
                Q(user=user)
            )
        return Post.objects.filter(user__is_private=False)
    
    def get_object(self):
        post = super().get_object()
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            if post.user != self.request.user:
                raise PermissionDenied("You do not have permission to modify this post.")
        return post

@extend_schema(
    request=CommentSerializer,
    summary="List/Create Comment"
)
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        post = get_object_or_404(Post, id=post_id)
        user = self.request.user

        # Check if the post is private and the user is not a follower
        if post.user.is_private and not Follower.objects.filter(user=post.user, follower=user).exists():
            raise PermissionDenied("You cannot view comments on this post.")

        return Comment.objects.filter(post__id=post_id).order_by('-created_at')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        post = get_object_or_404(Post, id=post_id)
        user = self.request.user

        if post.user.is_private and not Follower.objects.filter(user=post.user, follower=user , is_approved= True).exists():
            raise PermissionDenied("You cannot comment on this post.")

        serializer.save(user=user, post=post)

@extend_schema(
    request=CommentSerializer,
    summary="Detail Comment"
)
class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        comment = super().get_object()
        user = self.request.user

        # Ensure that only the comment owner or the post owner can delete the comment
        if self.request.method in ['DELETE']:
            if comment.user != user or comment.post.user != user:
                raise PermissionDenied("You do not have permission to delete this comment.")
        elif self.request.method in ['PUT', 'PATCH']:
            if comment.user != user:
                raise PermissionDenied("You do not have permission to modify this comment.")
        return comment

@extend_schema(
    request=LikeSerializer,
    summary="Like or Unlike a Post"
)
class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        post = get_object_or_404(Post, id=post_id)
        user = self.request.user

        # Check if the post is private and the user is not a follower
        if post.user.is_private and not Follower.objects.filter(user=post.user, follower=user ,is_approved= True).exists():
            raise PermissionDenied("You cannot like this post.")

        # Check if the user has already liked this post
        existing_like = Like.objects.filter(user=user, post=post).first()
        if existing_like:
            # Unlike the post by deleting the existing like
            existing_like.delete()
            return Response({"detail": "You have unliked this post."}, status=status.HTTP_204_NO_CONTENT)

        # Create a new like if no existing like is found
        serializer.save(user=user, post=post)
        return Response({"detail": "You have liked this post."}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(
    request=LikeSerializer,
    summary="List Likes"
)
class LikeListView(generics.ListAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        post = get_object_or_404(Post, id=post_id)
        user = self.request.user

        # Check if the post is private and the user is not a follower
        if post.user.is_private and not Follower.objects.filter(user=post.user, follower=user , is_approved= True).exists():
            raise PermissionDenied("You cannot view likes on this post.")

        return Like.objects.filter(post__id=post_id).order_by('-created_at')



from django.contrib.auth import get_user_model
from .models import Follower

User = get_user_model()

@extend_schema(
    request=UserSerializer,
    summary="List Following"
)
class ListFollowingView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(followers__follower=user)

@extend_schema(
    request=UserSerializer,
    summary="List Followers"
)
class ListFollowersView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(following__user=user)
    





# social_network/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Follower, CustomUser
from django.shortcuts import get_object_or_404

class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]
    @extend_schema(
    summary="Follow Request"
    )
    def post(self, request, *args, **kwargs):
        username_to_follow = kwargs.get('username')
        user_to_follow = get_object_or_404(CustomUser, username=username_to_follow)
        user = request.user

        if Follower.objects.filter(user=user_to_follow, follower=user).exists():
            return Response({"detail": "Follow request already sent or already following."}, status=status.HTTP_400_BAD_REQUEST)

        is_approved = not user_to_follow.is_private
        Follower.objects.create(user=user_to_follow, follower=user, is_approved=is_approved)
        return Response({"detail": "Follow request sent." if not is_approved else "Followed successfully."}, status=status.HTTP_201_CREATED)
    @extend_schema(
    summary="Unfollow Request"
    )
    def delete(self, request, *args, **kwargs):
        username_to_unfollow = kwargs.get('username')
        user_to_unfollow = get_object_or_404(CustomUser, username=username_to_unfollow)
        user = request.user

        follow_instance = Follower.objects.filter(user=user_to_unfollow, follower=user)
        if not follow_instance.exists():
            return Response({"detail": "You are not following this user."}, status=status.HTTP_400_BAD_REQUEST)

        follow_instance.delete()
        return Response({"detail": "Unfollowed successfully."}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(
    summary="Approve Request"
)
class ApproveFollowRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        username_of_follower = kwargs.get('username')
        follower_instance = get_object_or_404(Follower, user=request.user, follower__username=username_of_follower)

        if follower_instance.is_approved:
            return Response({"detail": "Follow request already approved."}, status=status.HTTP_400_BAD_REQUEST)

        follower_instance.is_approved = True
        follower_instance.save()
        return Response({"detail": "Follow request approved."}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        username_of_follower = kwargs.get('username')
        follower_instance = get_object_or_404(Follower, user=request.user, follower__username=username_of_follower)

        follower_instance.delete()
        return Response({"detail": "Follow request denied."}, status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    request=PostSerializer,
    summary="Search Post"
)
class SearchPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        search_term = self.kwargs.get('content', '')

        # Get the current user
        user = self.request.user

        # Get the posts from public users or followed private users
        public_users = CustomUser.objects.filter(is_private=False)
        followed_private_users = CustomUser.objects.filter(
            is_private=True, 
            followers__follower=user, 
            followers__is_approved=True
        )

        # Combine the public users and followed private users
        accessible_users = public_users | followed_private_users

        # Filter posts based on the search term and accessible users
        return Post.objects.filter(content__icontains=search_term, user__in=accessible_users)

@extend_schema(
    summary="Save Post",
    request=SavaPostSpectacular,
)
class SavePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        post = get_object_or_404(Post, id=post_id)
        user = request.user

        if SavedPost.objects.filter(user=user, post=post).exists():
            return Response({"detail": "Post already saved."}, status=status.HTTP_400_BAD_REQUEST)

        SavedPost.objects.create(user=user, post=post)
        return Response({"detail": "Post saved successfully."}, status=status.HTTP_201_CREATED)

@extend_schema(
    summary="Unsave Post",
    request=SavaPostSpectacular,
)
class UnsavePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        post = get_object_or_404(Post, id=post_id)
        user = request.user

        saved_post = SavedPost.objects.filter(user=user, post=post).first()
        if not saved_post:
            return Response({"detail": "Post not saved."}, status=status.HTTP_400_BAD_REQUEST)

        saved_post.delete()
        return Response({"detail": "Post unsaved successfully."}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(
    summary="List Saved Post",
    request=PostSerializer,
)
class ListSavedPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(savedpost__user=user)    