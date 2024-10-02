from django.contrib.auth import get_user_model
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework import permissions, status
from rest_framework.generics import DestroyAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsAdminOrSelf
from .serializers import FakePasswordResetSerializer, PublicProfileSerializer

User = get_user_model()

@extend_schema(
    description='This endpoint can also be used for deleting customers & suppliers by admin'
)
class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]
    lookup_field = 'pk'


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check for custom permission
        self.check_object_permissions(request, instance)
        
        self.perform_destroy(instance)
        return Response({"message": "User deleted"}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()


class PublicProfileAPIView(RetrieveAPIView):
    queryset = User.objects.select_related('user_prices').all()
    serializer_class = PublicProfileSerializer


class FakePasswordResetView(APIView):
    @extend_schema(
        description="Fake Api password takes phone and new password - checks if phone in database then set the password to user",
        examples=[
            OpenApiExample(
                "Successful Example",
                value={"message": "Password reset successfully."},
                response_only=True,
                status_codes=["200"]
            ),
            OpenApiExample(
                "Error Example",
                value={"message": "User with this phone does not exist."},
                response_only=True,
                status_codes=["400"]
            ),
        ],
        request=FakePasswordResetSerializer,  # You can specify request schema here
        responses={
            200: OpenApiExample(
                "Success", 
                value={"message": "Success"}
            ),
            400: OpenApiExample(
                "Error", 
                value={"error": "Bad Request."}
            )
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = FakePasswordResetSerializer(data=request.data)
        
        if serializer.is_valid():
            phone = serializer.validated_data['phone']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(phone=phone)
                user.set_password(new_password)
                user.save()

                return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User with this phone does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
