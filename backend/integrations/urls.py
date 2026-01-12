
from django.urls import path
from .views import IntegrationList, IntegrationConnect

urlpatterns = [
    path('', IntegrationList.as_view(), name='integration-list'),
    path('connect/', IntegrationConnect.as_view(), name='integration-connect'),
]
