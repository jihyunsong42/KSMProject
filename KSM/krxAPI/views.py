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
from collections import OrderedDict



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

def getDayIndex(self):
    date = datetime.date(datetime.now())
    date1wago = datetime.date(datetime.now() - relativedelta(weeks=2))
    today = date.strftime("%Y%m%d")
    today1wago = date1wago.strftime("%Y%m%d")
    
    kospi = stock.get_index_ohlcv_by_date(today1wago, today, '1001') # KOSPI
    kosdaq = stock.get_index_ohlcv_by_date(today1wago, today, '2001') # KOSDAQ
    kospi200 = stock.get_index_ohlcv_by_date(today1wago, today, '1028') # KOSPI 200

    kospi = kospi.tail(2)
    kosdaq = kosdaq.tail(2)
    kospi200 = kospi200.tail(2)
    
    # kospi
    kospi_prev = kospi["종가"][0]
    kospi_curr = kospi["종가"][1]

    kospi_diff = kospi_curr - kospi_prev
    kospi_diff = round(kospi_diff, 2)
    kospi_flucRate = ((kospi_curr - kospi_prev) / kospi_prev) * 100
    kospi_flucRate = round(kospi_flucRate, 2)

    # kosdaq
    kosdaq_prev = kosdaq["종가"][0]
    kosdaq_curr = kosdaq["종가"][1]
    print(kosdaq_prev)
    print(kosdaq_curr)
    kosdaq_diff = kosdaq_curr - kosdaq_prev
    kosdaq_diff = round(kosdaq_diff, 2)
    kosdaq_flucRate = ((kosdaq_curr - kosdaq_prev) / kosdaq_prev) * 100
    kosdaq_flucRate = round(kosdaq_flucRate, 2)

    # kospi 200
    kospi200_prev = kospi200["종가"][0]
    kospi200_curr = kospi200["종가"][1]

    kospi200_diff = kospi200_curr - kospi200_prev
    kospi200_diff = round(kospi200_diff, 2)
    kospi200_flucRate = ((kospi200_curr - kospi200_prev) / kospi200_prev) * 100
    kospi200_flucRate = round(kospi200_flucRate, 2)

    json_file = OrderedDict()
    json_file["KOSPI"] = {'CurrentPrice': kospi_curr, 'FluctuatedAmount': kospi_diff, 'FluctuatedRate': kospi_flucRate}
    json_file["KOSDAQ"] = {'CurrentPrice': kosdaq_curr, 'FluctuatedAmount': kosdaq_diff, 'FluctuatedRate': kosdaq_flucRate}
    json_file["KOSPI200"] = {'CurrentPrice': kospi200_curr, 'FluctuatedAmount': kospi200_diff, 'FluctuatedRate': kospi200_flucRate}
    js = json.dumps(json_file)
    return JsonResponse(js, safe=False)



def getKospiChart(self):
    date = datetime.date(datetime.now())
    date1yago = datetime.date(datetime.now() - relativedelta(years=1))
    
    date1dago = datetime.date(datetime.now() - relativedelta(days=2))

    today = date.strftime("%Y%m%d")
    today_1yago = date1yago.strftime("%Y%m%d")

    stock_month = stock.get_index_ohlcv_by_date(today_1yago, today, '1001')
    stock_month.columns = ["StartPrice", "HighPrice", "LowPrice", "EndPrice", "Volume"]

    records = json.loads(stock_month.to_json())
    return JsonResponse(records)

def getKosdaqChart(self):
    date = datetime.date(datetime.now())
    date1yago = datetime.date(datetime.now() - relativedelta(years=1))
    today = date.strftime("%Y%m%d")
    today_1yago = date1yago.strftime("%Y%m%d")
    
    stock_month = stock.get_index_ohlcv_by_date(today_1yago, today, '2001')
    
    stock_month.columns = ["StartPrice", "HighPrice", "LowPrice", "EndPrice", "Volume"]

    records = json.loads(stock_month.to_json())
    return JsonResponse(records)


def getKospi200Chart(self):
    date = datetime.date(datetime.now())
    date1yago = datetime.date(datetime.now() - relativedelta(years=1))
    today = date.strftime("%Y%m%d")
    today_1yago = date1yago.strftime("%Y%m%d")
    
    stock_month = stock.get_index_ohlcv_by_date(today_1yago, today, '1028')
    
    stock_month.columns = ["StartPrice", "HighPrice", "LowPrice", "EndPrice", "Volume"]

    records = json.loads(stock_month.to_json())
    return JsonResponse(records)
