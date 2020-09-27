from django.db import models
from datetime import datetime, timedelta
import urllib.parse as urlparse
from urllib.request import urlopen
import xmltodict
import json


HOLIDAY_URL = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService"
HOLIDAY_OP = "getHoliDeInfo"
HOLIDAY_KEY = "zNmGaQBxA1xPc3hd0p10ojmpRb%2FOfm44F%2FLmkGVSotjCn4I8NixNLbTO%2BwOtYE30CHoqd0WUDZb62Ut%2F2ffOLw%3D%3D"
now = datetime.now()
PARAMS_URL = urlparse.urlencode({'solYear':now.year, 'solMonth':now.strftime("%m")}) # year and month parameter
# Create your models here.
def marketStartEndTime():
    # nextday = now + timedelta(days = 1)

    request_query = HOLIDAY_URL + '/' + HOLIDAY_OP + '?' + PARAMS_URL + '&' + 'serviceKey' + '=' + HOLIDAY_KEY
    
    xmlfile = urlopen(request_query)
    # readxml = xmlfile.read()
    data_dict = xmltodict.parse(xmlfile.read())
    xmlfile.close()
    jsonfile = json.loads(json.dumps(data_dict, indent=2))
    return jsonfile