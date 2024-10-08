from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import (LoginView, LogoutView, PasswordChangeView,
                                UserDetailsView)
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from . import views

urlpatterns = [
    path('registration/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('user/<int:pk>/delete/', views.UserDeleteView.as_view(), name='user-delete'),
    path('user/public/<int:pk>/', views.PublicProfileAPIView.as_view(), name='user-public'),
    path('fake-password-reset/', views.FakePasswordResetView.as_view(), name='fake_password_reset'),
]
