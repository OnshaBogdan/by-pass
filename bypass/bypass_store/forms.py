from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import User


class LoginForm(AuthenticationForm):

    class Meta:
        model = User
        fields = ('email', 'password', )


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)
    email = forms.EmailField(max_length=254, required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2',)
