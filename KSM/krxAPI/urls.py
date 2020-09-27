from django.urls import path
from . import views

urlpatterns = [
    path('getInterestRate', views.getInterestRate, name='getInterestRate'),
    path('getUSexchangeRate', views.getUSexchangeRate, name='getUSexchangeRate'),
    path('getEUexchangeRate', views.getEUexchangeRate, name='getEUexchangeRate'),
    path('getDayIndex', views.getDayIndex, name="getDayIndex"),
    path('getKospiChart', views.getKospiChart, name="getKospiChart"),
    path('getKosdaqChart', views.getKosdaqChart, name="getKosdaqChart"),
    path('getKospi200Chart', views.getKospi200Chart, name="getKospi200Chart"),
    path('getMarketStartEndTime', views.getMarketStartEndTime, name="getMarketStartEndTime")
]