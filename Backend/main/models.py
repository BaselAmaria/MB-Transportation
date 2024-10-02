from django.db import models
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

TYPE_CHOICES = [
    ("apartment", "Appartment"),
    ("office", "Office"),
    ("construction", "Construction materials"),
    ("other", "Others"),
]

STATUS_CHOICES = [
    ("pending", "Pending"),
    ("completed", "Completed"),
    ("canceled", "Canceled"),
]


class SupplierPrice(models.Model):
    apartment_price = models.DecimalField(
        "The price of 1 km for apartments",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    office_price = models.DecimalField(
        "The price of 1 km for offices",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    construction_price = models.DecimalField(
        "The price of 1 km for Construction materials",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    other_price = models.DecimalField(
        "The price of 1 km for Others",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    box_price = models.DecimalField(
        "The price per box",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    supplier = models.OneToOneField(
        User,
        related_name="user_prices",
        verbose_name="Supplier",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Supplier Price"
        verbose_name_plural = "Supplier Prices"
        ordering = ("id",)

    def __str__(self):
        return str(self.supplier.email)


class Order(models.Model):
    moving_type = models.CharField("Moving Type", choices=TYPE_CHOICES, default="apartment", max_length=20)
    full_name = models.CharField("Full Name", max_length=255, blank=True, null=True)
    tel_number = models.CharField("Tel Number", max_length=255, blank=True, null=True)
    place_from = models.CharField("Place From", max_length=255, blank=True, null=True)
    place_to = models.CharField("Place To", max_length=255, blank=True, null=True)
    distance = models.IntegerField("Distance in KM", blank=True, null=True)
    boxes = models.IntegerField("Boxes number", blank=True, null=True)
    status = models.CharField("Status", choices=STATUS_CHOICES, default="pending", max_length=20)
    which_date = models.DateTimeField("Which Date", blank=True, null=True)
    cancel_reason = models.CharField("Reason for Cancel", max_length=500, blank=True, null=True)
    price = models.DecimalField(
        "Price",
        blank=True,
        null=True,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    supplier = models.ForeignKey(
        User,
        related_name="supplier_orders",
        verbose_name="Supplier",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    customer = models.ForeignKey(
        User,
        related_name="customer_orders",
        verbose_name="Customer",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        ordering = ("-created_at",)

    def __str__(self):
        return str(self.id)


class Review(models.Model):
    supplier = models.ForeignKey(
        User,
        related_name="supplier_reviews",
        verbose_name="Supplier",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    customer = models.ForeignKey(
        User,
        related_name="customer_reviews",
        verbose_name="Customer",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    order = models.ForeignKey(
        Order,
        related_name="order_reviews",
        verbose_name="Order",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    stars = models.PositiveIntegerField(
        "Stars",
        help_text="give rating from 1 to 5 starts.",
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    comment = models.TextField('Your comment', blank=True, null=True)
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ("-created_at",)

    def __str__(self):
        return str(self.stars)


class ContactUs(models.Model):
    name = models.CharField("Your Name", max_length=254)
    subject = models.CharField("Subject", max_length=254)
    email = models.EmailField("Your Email")
    message = models.TextField("Your Message")

    class Meta:
        verbose_name = "Contact us message"
        verbose_name_plural = "Contact us messages"

    def __str__(self):
        return f'Message from: {self.name} - {self.email}'


class HotSale(models.Model):
    supplier = models.ForeignKey(
        User,
        related_name="supplier_sales",
        verbose_name="Supplier",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    text = models.TextField("Text")
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        verbose_name = "Hot Sale"
        verbose_name_plural = "Hot Sales"

    def __str__(self):
        if self.supplier:
            return f'Hot Sale from: {self.supplier.first_name}'
        else:
            return 'Hot Sale'
