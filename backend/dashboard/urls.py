
from django.urls import path
from .views import GoalList, GoalDetail, NoteList, StatsView, TeamMemberList, IntegrationList, BenchmarkList, AlertList

urlpatterns = [
    path('goals/', GoalList.as_view(), name='goal-list'),
    path('goals/<str:title>/', GoalDetail.as_view(), name='goal-detail'),
    path('notes/', NoteList.as_view(), name='note-list'),
    path('stats/', StatsView.as_view(), name='dashboard-stats'),
    path('team/members/', TeamMemberList.as_view(), name='team-member-list'),
    path('integrations/', IntegrationList.as_view(), name='integration-list'),
    path('benchmarks/', BenchmarkList.as_view(), name='benchmark-list'),
    path('alerts/', AlertList.as_view(), name='alert-list'),
]
