from django.urls import path
from . import views

urlpatterns = [
    path('getInterestRate', views.getInterestRate, name='getInterestRate'),
    path('getUSexchangeRate', views.getUSexchangeRate, name='getUSexchangeRate'),
    path('getEUexchangeRate', views.getEUexchangeRate, name='getEUexchangeRate'),
    path('getMonthChart', views.getMonthChart, name="getMonthChart"),
    path('', views.get, name='getKrxAPI')
]