from django.db import models
from datetime import datetime, timedelta
import urllib.parse as urlparse
from urllib.request import urlopen
import xmltodict
import json
from pykrx import stock
from dateutil.relativedelta import relativedelta

# Create your models here.
def marketStartEndTime():
    now = datetime.now()
    # now = datetime.date(datetime.utcnow() + relativedelta(months=1))
    print(now)
    print(now.year)
    print(now.month)
    days = stock.get_business_days(now.year, now.month)
    print(days)
    day = None
    for d in days:
        if (d > now):
            day = d
            break
    print(day)
    return days