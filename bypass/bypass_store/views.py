from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

from .forms import SignUpForm


def home(request):
    return render(request, 'bypass_store/home_template.html')


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
    return render(request, 'bypass_store/sign_up_template.html', {'form': form})


def sign_in(request):
    return render(request, 'bypass_store/sign_in_template.html', context={})
