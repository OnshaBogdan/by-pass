from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import SignUpForm, LoginForm


def home(request):
    return render(request, 'bypass_store/home_template.html', {'user': request.user})


def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home_page')
    else:
        form = SignUpForm()
    return render(request, 'bypass_store/sign_up_template.html', {'form': form, 'user': request.user})


def sign_in(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        print(form.is_valid())
        if form.is_valid():
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=raw_password)
            print(user)
            if not user:
                messages.error(request, "Wrong login information")
                return render(request, 'bypass_store/sign_in_template.html', {'form': form})
            else:
                login(request, user)
                return redirect('home_page')
    else:
        form = LoginForm()
    return render(request, 'bypass_store/sign_in_template.html', {'form': form, 'user': request.user})


def sign_out(request):
    logout(request)
    return redirect('home_page')
