from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, serializers

from .serializers import RegisterSerializer


User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for registering a new user.
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeSerializer(serializers.ModelSerializer):
    """
    Serializer for the currently authenticated user.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "avatar",
            "created_at",
        ]
        read_only_fields = fields


class MeView(generics.RetrieveAPIView):
    """
    Return the currently authenticated user's profile.
    """

    serializer_class = MeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user