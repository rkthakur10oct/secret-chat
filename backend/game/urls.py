from django.urls import path

from .views import (
    GameDetailView,
    GameGuessView,
    GameListView,
    LeaderboardView,
)


urlpatterns = [
    path("", GameListView.as_view(), name="game-list"),
    path(
        "leaderboard/",
        LeaderboardView.as_view(),
        name="leaderboard",
    ),
    path(
        "<int:pk>/",
        GameDetailView.as_view(),
        name="game-detail",
    ),
    path(
        "<int:pk>/guess/",
        GameGuessView.as_view(),
        name="game-guess",
    ),
]