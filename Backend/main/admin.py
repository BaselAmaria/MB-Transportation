from django.contrib import admin

from .models import Order, Review, SupplierPrice, ContactUs, HotSale


@admin.register(SupplierPrice)
class SupplierPriceAdmin(admin.ModelAdmin):
    list_display = ['__str__']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['__str__']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['__str__']


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ['__str__']


@admin.register(HotSale)
class HotSaleAdmin(admin.ModelAdmin):
    list_display = ['__str__']
