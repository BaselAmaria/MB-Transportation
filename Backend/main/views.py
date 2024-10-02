from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, UpdateAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactUs, HotSale, Order, Review, SupplierPrice
from .permissions import IsAdmin, IsCustomer, IsSupplier
from .serializers import (ContactUsSerializer, CustomerSerializer,
                          HotSaleSerializer, OrderSerializer, ReviewSerializer,
                          SupplierPriceSerializer, SupplierSerializer)

User = get_user_model()


class PriceCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = SupplierPrice.objects.all()
    serializer_class = SupplierPriceSerializer

    def perform_create(self, serializer):
        serializer.save(supplier=self.request.user)


class PriceUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsSupplier]
    queryset = SupplierPrice.objects.all()
    serializer_class = SupplierPriceSerializer


@extend_schema(
    description='moving_type choices are: (apartment - office - construction, other)'
)
class OrderCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        moving_type = serializer.validated_data['moving_type']
        distance = serializer.validated_data['distance']
        boxes = serializer.validated_data['boxes']
        supplier = serializer.validated_data['supplier']
        if moving_type == 'apartment':
            supplier_price = supplier.user_prices.apartment_price
        elif moving_type == 'office':
            supplier_price = supplier.user_prices.office_price
        elif moving_type == 'construction':
            supplier_price = supplier.user_prices.construction_price
        elif moving_type == 'other':
            supplier_price = supplier.user_prices.other_price
        if not supplier_price:
            supplier_price = 0.00
        if not distance:
            distance = 0.00
        boxes_price = boxes * supplier.user_prices.box_price
        order_price = distance * supplier_price + boxes_price
        serializer.save(customer=self.request.user, price=order_price)


class OrderUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsSupplier]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class ReviewCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        order = serializer.validated_data['order']
        serializer.save(customer=self.request.user, supplier=order.supplier)
        order.supplier.get_supplier_rating()


class SupplierListAPIView(ListAPIView):
    queryset = User.objects.filter(account_type='supplier')
    serializer_class = SupplierSerializer


@extend_schema(
    description='Search parameter is (order_id): ex.. /api/orders/search/?order_id=1'
)
class CustomerOrderListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(customer=user)
        search_query = self.request.query_params.get('order_id', None)
        if search_query:
            order_id = search_query
            queryset = queryset.filter(id=order_id)
        return queryset.distinct()


class CustomerOrderDeleteView(DestroyAPIView):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated, IsCustomer]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check for custom permission
        self.check_object_permissions(request, instance)
        
        self.perform_destroy(instance)
        return Response({"message": "Order deleted"}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()


class ContactUsCreateAPIView(CreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer



class HotSaleViewSet(viewsets.ModelViewSet):
    queryset = HotSale.objects.all()
    serializer_class = HotSaleSerializer
    permission_classes = [IsAuthenticated, IsSupplier]


# Admin Views
class StatsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        customer_count = User.objects.filter(account_type='customer').count()
        supplier_count = User.objects.filter(account_type='supplier').count()
        order_count = Order.objects.count()

        data = {
            'customer_count': customer_count,
            'supplier_count': supplier_count,
            'order_count': order_count,
        }
        return Response(data, status=status.HTTP_200_OK)


class SupplierAdminList(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = User.objects.filter(account_type='supplier')
    serializer_class = SupplierSerializer


class CustomerAdminList(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = User.objects.filter(account_type='customer')
    serializer_class = CustomerSerializer


class OrderAdminList(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


@extend_schema(
    description='status choices are: (pending - completed - canceled)'
)
class OrderAdminUpdate(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderAdminDelete(DestroyAPIView):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check for custom permission
        self.check_object_permissions(request, instance)
        
        self.perform_destroy(instance)
        return Response({"message": "Order deleted"}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()


class ContactUsListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class ContactUsDeleteView(DestroyAPIView):
    queryset = ContactUs.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check for custom permission
        self.check_object_permissions(request, instance)
        
        self.perform_destroy(instance)
        return Response({"message": "Message deleted"}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()
