from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    def clean_email(self):
        email = self.cleaned_data["email"]
        if email:
            match = User.objects.filter(email=email)
            if match:
                raise forms.ValidationError("This email address is already in use")
            return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.save()

        if commit:
            user.save()
        return user
    

class CustomUserChangeForm(UserChangeForm):
    def clean_email(self):
        email = self.cleaned_data["email"]
        if email:
            match = User.objects.filter(email=email).exclude(id=self.instance.pk)
            if match:
                raise forms.ValidationError("This email address is already in use")
            return email
