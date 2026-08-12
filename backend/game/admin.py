from django.contrib import admin

from .models import Game, Message, Score, Suspect


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "difficulty",
        "created_at",
    ]

    list_filter = [
        "difficulty",
    ]

    search_fields = [
        "title",
        "description",
    ]


@admin.register(Suspect)
class SuspectAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "game",
        "is_imposter",
    ]

    list_filter = [
        "is_imposter",
    ]

    search_fields = [
        "name",
    ]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "game",
        "suspect",
        "order",
        "created_at",
    ]

    list_filter = [
        "game",
    ]

    search_fields = [
        "text",
    ]

    ordering = [
        "game",
        "order",
    ]


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "game",
        "points",
        "is_correct",
        "created_at",
    ]

    list_filter = [
        "is_correct",
        "game",
    ]

    search_fields = [
        "user__username",
        "game__title",
    ]