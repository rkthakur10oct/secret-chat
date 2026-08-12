from rest_framework import serializers

from .models import Game, Message, Suspect


class GameListSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying available games.
    """

    class Meta:
        model = Game
        fields = [
            "id",
            "title",
            "description",
            "difficulty",
            "created_at",
        ]
        read_only_fields = fields


class SuspectSerializer(serializers.ModelSerializer):
    """
    Public suspect information.

    The imposter flag is intentionally hidden.
    """

    class Meta:
        model = Suspect
        fields = [
            "id",
            "name",
            "avatar",
        ]
        read_only_fields = fields


class MessageSerializer(serializers.ModelSerializer):
    """
    Public chat message information.
    """

    suspect = serializers.CharField(
        source="suspect.name",
        read_only=True,
    )

    class Meta:
        model = Message
        fields = [
            "id",
            "suspect",
            "text",
            "order",
        ]
        read_only_fields = fields


class GameDetailSerializer(serializers.ModelSerializer):
    """
    Complete public game information including
    suspects and chat messages.
    """

    suspects = SuspectSerializer(
        many=True,
        read_only=True,
    )

    messages = MessageSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Game
        fields = [
            "id",
            "title",
            "description",
            "difficulty",
            "created_at",
            "suspects",
            "messages",
        ]
        read_only_fields = fields
        
class GuessSerializer(serializers.Serializer):
    """
    Validates the suspect selected by the player.
    """

    suspect_id = serializers.IntegerField(min_value=1)