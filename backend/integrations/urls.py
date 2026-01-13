
from django.urls import path
from .views import IntegrationList, IntegrationConnect, IntegrationDisconnect

urlpatterns = [
    path('', IntegrationList.as_view(), name='integration-list'),
    path('connect/', IntegrationConnect.as_view(), name='integration-connect'),
    path('disconnect/', IntegrationDisconnect.as_view(), name='integration-disconnect'),
]
