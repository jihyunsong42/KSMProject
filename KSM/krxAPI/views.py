from django.shortcuts import render
from pykrx import stock
from django.http import JsonResponse
import json
import pandas as pd
import xmltodict
import requests
from datetime import datetime
from dateutil.relativedelta import relativedelta
import string
from . import models

from urllib.request import urlopen
import urllib.parse as urlparse

import pandas_datareader.data as web




# Create your views here.

def getExchangeRate(url):
    html = urlopen(url).read()
    data = json.loads(html)
    return data

def getUSexchangeRate(self):
    USD_Rate_URL = "https://api.exchangeratesapi.io/latest?base=USD"
    return JsonResponse(getExchangeRate(USD_Rate_URL))

def getEUexchangeRate(self):
    EU_Rate_URL = "https://api.exchangeratesapi.io/latest"
    return JsonResponse(getExchangeRate(EU_Rate_URL))

def getInterestRate(self):
    key = "EQO0KCBUM5UE6FCN12FH/"
    parentCode = '098Y001/'

    date = datetime.date(datetime.now())
    nextDate = datetime.date(datetime.now() + relativedelta(months=1))
    currentMonth = date.strftime("%Y%m")
    nextMonth = nextDate.strftime("%Y%m")
    
    url = "http://ecos.bok.or.kr/api/StatisticSearch/" + key + "json/en/1/10/" + parentCode + "DD/" + currentMonth + "/" + nextMonth + "/?/?/?/"

    res = urlopen(url)
    html = res.read()
    data = json.loads(html)
    return JsonResponse(data)

def getMarketStartEndTime(self):
    jsonfile = models.marketStartEndTime()
    return JsonResponse(jsonfile)

def getMonthChart(self):


    date = datetime.date(datetime.now())
    date10yago = datetime.date(datetime.now() - relativedelta(years=10))
    today = date.strftime("%Y%m%d")
    today_10yago = date10yago.strftime("%Y%m%d")
    
    
    stock_month = stock.get_index_ohlcv_by_date(today_10yago, today, '코스피')
    print(stock.get_index_price_change_by_name(today_10yago, today))
    
    stock_month.columns = ["StartPrice", "HighPrice", "LowPrice", "EndPrice", "Volume"]

    records = json.loads(stock_month.to_json())
    return JsonResponse(records)
