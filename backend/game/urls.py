from django.urls import path

from .views import (
    GameDetailView,
    GameGuessView,
    GameListView,
)


urlpatterns = [
    path("", GameListView.as_view(), name="game-list"),
    path("<int:pk>/", GameDetailView.as_view(), name="game-detail"),
    path("<int:pk>/guess/", GameGuessView.as_view(), name="game-guess"),
]