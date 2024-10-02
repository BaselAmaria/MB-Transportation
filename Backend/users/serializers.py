import dns.resolver
from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from main.models import SupplierPrice
from main.serializers import SupplierPriceSerializer, ReviewSerializer, OrderSerializer

User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )
    last_name = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )
    account_type = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )
    address = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )
    phone = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )
    company = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=255
    )

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_account_settings.UNIQUE_EMAIL:
            if email:
                match = User.objects.filter(email=email)
                if match:
                    raise serializers.ValidationError(
                        "A user is already registered with this e-mail address."
                    )
                # Check domain existence
                domain = email.split("@")[1]
                try:
                    dns.resolver.resolve(domain, "MX")
                except (
                    dns.resolver.NoNameservers,
                    dns.resolver.NXDOMAIN,
                    dns.resolver.NoAnswer,
                ):
                    raise serializers.ValidationError(
                        "Please enter a valid email address"
                    )
        return email

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["last_name"] = self.validated_data.get("last_name", "")
        data_dict["account_type"] = self.validated_data.get("account_type", "")
        data_dict["phone"] = self.validated_data.get("phone", "")
        data_dict["address"] = self.validated_data.get("address", "")
        data_dict["company"] = self.validated_data.get("company", "")
        return data_dict

    def save(self, request):
        user = super().save(request)
        user.account_type = self.validated_data.get("account_type", "")
        user.phone = self.validated_data.get("phone", "")
        user.address = self.validated_data.get("address", "")
        user.company = self.validated_data.get("company", "")
        user.save()
        if user and user.account_type == 'supplier':
            SupplierPrice.objects.create(supplier=user)
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    user_prices = SupplierPriceSerializer(read_only=True)
    supplier_reviews = ReviewSerializer(read_only=True, many=True)
    customer_orders = OrderSerializer(read_only=True, many=True)
    supplier_orders = OrderSerializer(read_only=True, many=True)

    class Meta(UserDetailsSerializer.Meta):
        read_only_fields = ()
        fields = UserDetailsSerializer.Meta.fields + (
            "address",
            "phone",
            "company",
            "account_type",
            "user_prices",
            "rating",
            "supplier_reviews",
            "customer_orders",
            "supplier_orders",
        )


class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        user = self._validate_user(email)

        if user is None:
            raise ValidationError("Unable to log in with provided credentials.")

        if self._validate_password(user, password):
            if not user.is_active:
                raise ValidationError("This account is inactive.")

            attrs["user"] = user
            return attrs

        raise ValidationError("Unable to log in with provided credentials.")

    def _validate_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None

    def _validate_password(self, user, password):
        return user.check_password(password)


class PublicProfileSerializer(serializers.ModelSerializer):
    user_prices = SupplierPriceSerializer(read_only=True)
    supplier_reviews = ReviewSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "phone",
            "username",
            "email",
            "address",
            "company",
            "account_type",
            "user_prices",
            "rating",
            "supplier_reviews",
        )


class FakePasswordResetSerializer(serializers.Serializer):
    phone = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        # Check if the phone exists in the database
        if not User.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Email not found.")
        return value
