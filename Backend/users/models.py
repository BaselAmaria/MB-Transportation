from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

TYPE_CHOICES = [
    ("admin", "Admin"),
    ("customer", "Customer"),
    ("supplier", "Supplier"),
]


class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """Custom User Model"""
    username = None
    email = models.EmailField('Email', unique=True)
    first_name = models.CharField("First Name", max_length=255, null=True, blank=True)
    last_name = models.CharField("Last Name", max_length=255, null=True, blank=True)
    phone = models.CharField("Phone", max_length=255, null=True, blank=True)
    address = models.CharField("Address", max_length=255, null=True, blank=True)
    company = models.CharField("Company", max_length=255, null=True, blank=True)
    account_type = models.CharField(
        "Account Type", choices=TYPE_CHOICES, max_length=50, default="customer"
    )
    rating = models.FloatField("Average Rating", blank=True, null=True)
    REQUIRED_FIELDS = ['']
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ("-id",)

    def __str__(self):
        if self.first_name and self.last_name:
            return f'{self.first_name} {self.last_name}'
        else:
            return self.email

    def get_supplier_rating(self):
        if self.account_type == 'supplier':
            rating_1 = self.supplier_reviews.filter(stars=1).count() * 1
            rating_2 = self.supplier_reviews.filter(stars=2).count() * 2
            rating_3 = self.supplier_reviews.filter(stars=3).count() * 3
            rating_4 = self.supplier_reviews.filter(stars=4).count() * 4
            rating_5 = self.supplier_reviews.filter(stars=5).count() * 5
            total_reviews = self.supplier_reviews.all().count()
            if total_reviews == 0:
                total_reviews = 1
            average_rating = rating_1 + rating_2 + rating_3 + rating_4 + rating_5
            self.rating = average_rating / total_reviews
            self.save()
        else:
            pass
