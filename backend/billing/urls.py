from django.urls import path
from .views import CreateOrderView, VerifyPaymentView, UsageStatsView

urlpatterns = [
    path('order/', CreateOrderView.as_view(), name='create-order'),
    path('verify/', VerifyPaymentView.as_view(), name='verify-payment'),
    path('usage/', UsageStatsView.as_view(), name='usage-stats'),
]
