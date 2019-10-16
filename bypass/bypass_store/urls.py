from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home_page'),
    path('register/', views.sign_up, name='sign_up_page'),
    path('login/', views.sign_in, name='sign_in_page'),
    path('logout/', views.sign_out, name='sign_out_page'),
]