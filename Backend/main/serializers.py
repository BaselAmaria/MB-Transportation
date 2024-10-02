from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import ContactUs, Order, Review, SupplierPrice, HotSale

User = get_user_model()

class SupplierPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupplierPrice
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    supplier_name = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_supplier_name(self, instance):
        return f'{instance.supplier.first_name} {instance.supplier.last_name}'

    def get_customer_name(self, instance):
        return f'{instance.customer.first_name} {instance.customer.last_name}'


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'stars', 'comment', 'order', 'customer', 'customer_name']

    def get_customer_name(self, instance):
        return f'{instance.customer.first_name} {instance.customer.last_name}'


class SupplierSerializer(serializers.ModelSerializer):
    user_prices = SupplierPriceSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'company', 'rating', 'user_prices']


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'phone']


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ['id', 'name', 'subject', 'email', 'message']


class HotSaleSerializer(serializers.ModelSerializer):
    supplier_name = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = HotSale
        fields = '__all__'

    def get_supplier_name(self, instance):
        return f'{instance.supplier.first_name} {instance.supplier.last_name}'

    def get_company_name(self, instance):
        return f'{instance.supplier.company}'
