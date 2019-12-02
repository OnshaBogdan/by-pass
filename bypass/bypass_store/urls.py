from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', views.index),
    path('api/', include(router.urls)),
    path('api/login/', views.login),
    path('api/logout/', views.logout),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/products/', views.ProductList.as_view(), name='product-list')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
