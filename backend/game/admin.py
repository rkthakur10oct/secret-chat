from django.contrib import admin

from .models import Game, Message, Score, Suspect


# ============================================================
# SUSPECT INLINE
# ============================================================

class SuspectInline(admin.TabularInline):
    model = Suspect
    extra = 3
    fields = (
        "name",
        "avatar",
        "is_imposter",
    )


# ============================================================
# MESSAGE INLINE
# ============================================================

class MessageInline(admin.TabularInline):
    model = Message
    extra = 4
    fields = (
        "suspect",
        "text",
        "order",
    )
    ordering = ("order",)


# ============================================================
# GAME ADMIN
# ============================================================

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "difficulty",
        "created_at",
    )

    list_filter = (
        "difficulty",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
    )

    ordering = (
        "-created_at",
    )

    inlines = (
        SuspectInline,
        MessageInline,
    )

    fieldsets = (
        (
            "Game Information",
            {
                "fields": (
                    "title",
                    "description",
                    "difficulty",
                )
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    "created_at",
                ),
                "classes": (
                    "collapse",
                ),
            },
        ),
    )

    readonly_fields = (
        "created_at",
    )


# ============================================================
# SUSPECT ADMIN
# ============================================================

@admin.register(Suspect)
class SuspectAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "game",
        "is_imposter",
    )

    list_filter = (
        "game",
        "is_imposter",
    )

    search_fields = (
        "name",
        "game__title",
    )


# ============================================================
# MESSAGE ADMIN
# ============================================================

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "game",
        "suspect",
        "order",
        "short_text",
    )

    list_filter = (
        "game",
        "suspect",
    )

    search_fields = (
        "text",
        "suspect__name",
        "game__title",
    )

    ordering = (
        "game",
        "order",
    )

    def short_text(self, obj):
        if len(obj.text) > 60:
            return f"{obj.text[:60]}..."
        return obj.text

    short_text.short_description = "Message"


# ============================================================
# SCORE ADMIN
# ============================================================

@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "game",
        "points",
        "is_correct",
        "created_at",
    )

    list_filter = (
        "is_correct",
        "game",
        "created_at",
    )

    search_fields = (
        "user__username",
        "game__title",
    )

    ordering = (
        "-points",
        "created_at",
    )

    readonly_fields = (
        "user",
        "game",
        "points",
        "is_correct",
        "created_at",
    )