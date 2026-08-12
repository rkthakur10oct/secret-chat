from django.conf import settings
from django.db import models


class Game(models.Model):
    """
    Represents a single mystery game/mission.
    """

    class Difficulty(models.TextChoices):
        EASY = "EASY", "Easy"
        MEDIUM = "MEDIUM", "Medium"
        HARD = "HARD", "Hard"

    title = models.CharField(max_length=200)

    description = models.TextField(
        blank=True,
    )

    difficulty = models.CharField(
        max_length=10,
        choices=Difficulty.choices,
        default=Difficulty.EASY,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Suspect(models.Model):
    """
    Represents a character participating in a game.
    One suspect is secretly the imposter.
    """

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name="suspects",
    )

    name = models.CharField(
        max_length=100,
    )

    avatar = models.URLField(
        blank=True,
        null=True,
    )

    is_imposter = models.BooleanField(
        default=False,
    )

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name} - {self.game.title}"


class Message(models.Model):
    """
    Represents a chat message sent by a suspect.
    """

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name="messages",
    )

    suspect = models.ForeignKey(
        Suspect,
        on_delete=models.CASCADE,
        related_name="messages",
    )

    text = models.TextField()

    order = models.PositiveIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.suspect.name}: {self.text[:50]}"


class Score(models.Model):
    """
    Stores a player's result for a completed game.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="game_scores",
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name="scores",
    )

    points = models.IntegerField(
        default=0,
    )

    is_correct = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-points", "-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.game.title} - {self.points}"