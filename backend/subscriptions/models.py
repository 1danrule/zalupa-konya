from django.conf import settings
from django.db import models


class SubscriptionPlan(models.Model):
    """
    Simple subscription plan definition.
    """

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    is_premium = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class UserSubscription(models.Model):
    """
    Link a user to a subscription plan.
    """

    STATUS_ACTIVE = "active"
    STATUS_EXPIRED = "expired"
    STATUS_CANCELED = "canceled"
    STATUS_CHOICES = [
        (STATUS_ACTIVE, "Active"),
        (STATUS_EXPIRED, "Expired"),
        (STATUS_CANCELED, "Canceled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subscriptions",
    )
    plan = models.ForeignKey(
        SubscriptionPlan,
        on_delete=models.CASCADE,
        related_name="user_subscriptions",
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    started_at = models.DateTimeField()
    expires_at = models.DateTimeField()

    def __str__(self) -> str:
        return f"{self.user_id} -> {self.plan.code} ({self.status})"