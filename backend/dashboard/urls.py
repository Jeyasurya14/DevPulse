
from django.urls import path
from .views import GoalList, GoalDetail, NoteList

urlpatterns = [
    path('goals/', GoalList.as_view(), name='goal-list'),
    path('goals/<str:title>/', GoalDetail.as_view(), name='goal-detail'),
    path('notes/', NoteList.as_view(), name='note-list'),
]
