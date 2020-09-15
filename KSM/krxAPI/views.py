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

from urllib.request import urlopen

# Create your views here.
def get(self):
    return 0

def getExchangeRate(url):
    html = urlopen(url).read()
    data = json.loads(html)
    print(data)
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

def getMonthChart(self):
    stock_month = stock.get_market_ohlcv_by_date('19700101', '20200914', '000660')
    stock_month.columns = ["StartPrice", "HighPrice", "LowPrice", "EndPrice", "Volume"]

    records = json.loads(stock_month.to_json())
    return JsonResponse(records)
