from django.shortcuts import render
from pykrx import stock
from django.http import JsonResponse
import pandas as pd

# Create your views here.

def get(self):
    # list = stock.get_market_ticker_list()
    # s = stock.get_market_ticker_name("000660")
    # print("HHHH")
    # print(s)
    # list.to_json('test.json', orient="DataFrame")
    # listjson = pd.read_json('test.json', orient="DataFrame")
    return JsonResponse({"abc": "ABC"})