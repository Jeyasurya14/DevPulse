
from django.urls import path
from .views import CodeAnalysisView, RecommendationView

urlpatterns = [
    path('analyze/', CodeAnalysisView.as_view(), name='code-analyze'),
    path('recommendations/', RecommendationView.as_view(), name='recommendations'),
]
