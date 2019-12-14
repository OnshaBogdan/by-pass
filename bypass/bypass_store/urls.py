from django.conf import settings
from django.views.defaults import page_not_found
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers
from . import views


urlpatterns = [
    path('', views.index),
    path('api/login/', views.login),
    path('api/logout/', views.logout),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/products/', views.ProductList.as_view(), name='product-list'),
    path('api/users/', views.UserList.as_view(), name='user-list'),
    path('api/users/<pk>/', views.UserDetail.as_view(), name='user-detail'),
    path(r'^.*/$', page_not_found, name='not-found'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
