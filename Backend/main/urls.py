from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'api/hotsales', views.HotSaleViewSet)

urlpatterns = [
    path('api/prices/create/', views.PriceCreateAPIView.as_view()),
    path('api/prices/update/<int:pk>/', views.PriceUpdateAPIView.as_view()),
    path('api/orders/create/', views.OrderCreateAPIView.as_view()),
    path('api/orders/update/<int:pk>/', views.OrderUpdateAPIView.as_view()),
    path('api/orders/<int:pk>/delete/', views.CustomerOrderDeleteView.as_view()),
    path('api/orders/search/', views.CustomerOrderListAPIView.as_view()),
    path('api/reviews/create/', views.ReviewCreateAPIView.as_view()),
    path('api/message/create/', views.ContactUsCreateAPIView.as_view()),
    path('api/suppliers/', views.SupplierListAPIView.as_view()),
    # admin urls
    path('admin/messages/', views.ContactUsListAPIView.as_view()),
    path('admin/messages/<int:pk>/delete/', views.ContactUsDeleteView.as_view()),
    path('admin/dashboard/', views.StatsAPIView.as_view()),

    path('admin/customers/', views.CustomerAdminList.as_view()),
    path('admin/suppliers/', views.SupplierAdminList.as_view()),
    path('admin/orders/', views.OrderAdminList.as_view()),
    path('admin/orders/<int:pk>/update/', views.OrderAdminUpdate.as_view()),
    path('admin/orders/<int:pk>/delete/', views.OrderAdminDelete.as_view()),

    path('', include(router.urls)),
]