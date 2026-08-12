from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Game, Score, Suspect
from .serializers import (
    GameDetailSerializer,
    GameListSerializer,
    GuessSerializer,
)


class GameListView(generics.ListAPIView):
    """
    Return all available mystery games.
    """

    queryset = Game.objects.all()
    serializer_class = GameListSerializer
    permission_classes = [permissions.AllowAny]


class GameDetailView(generics.RetrieveAPIView):
    """
    Return complete public information for a single game.
    """

    queryset = Game.objects.all()
    serializer_class = GameDetailSerializer
    permission_classes = [permissions.AllowAny]


class GameGuessView(APIView):
    """
    Allows an authenticated player to guess the imposter.

    Correct guess:
        +100 points

    Wrong guess:
        -20 points
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        game = get_object_or_404(Game, pk=pk)

        serializer = GuessSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        suspect_id = serializer.validated_data["suspect_id"]

        try:
            suspect = Suspect.objects.get(
                id=suspect_id,
                game=game,
            )
        except Suspect.DoesNotExist:
            return Response(
                {
                    "detail": "This suspect does not belong to this game."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_score = Score.objects.filter(
            user=request.user,
            game=game,
        ).first()

        if existing_score:
            return Response(
                {
                    "detail": "You have already completed this game.",
                    "points": existing_score.points,
                    "is_correct": existing_score.is_correct,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        is_correct = suspect.is_imposter
        points = 100 if is_correct else -20

        Score.objects.create(
            user=request.user,
            game=game,
            points=points,
            is_correct=is_correct,
        )

        return Response(
            {
                "game": game.title,
                "suspect": suspect.name,
                "is_correct": is_correct,
                "points": points,
                "message": (
                    "🎉 Correct! You found the imposter."
                    if is_correct
                    else "❌ Wrong suspect. The mystery continues."
                ),
            },
            status=status.HTTP_200_OK,
        )