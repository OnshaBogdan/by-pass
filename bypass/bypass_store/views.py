from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from .models import User
from .serializers import UserSerializer


def index(request):
    return render(request, 'bypass_store/index.html')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response(
            {'error': 'Please provide both username and password'},
            status=HTTP_400_BAD_REQUEST
        )
    user = auth.authenticate(username=username, password=password)

    if not user:
        return Response(
            {'error': 'Invalid Credentials'},
            status=HTTP_404_NOT_FOUND
        )
    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        {
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        },
        status=HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def logout(request):
    auth.logout(request)

    request.auth.delete()

    return Response(
        {"success": "Successfully logged out."},
        status=HTTP_200_OK
    )
