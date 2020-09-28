import { Component, OnInit } from '@angular/core';
import { dateFormat } from 'highcharts';
import { HttpService }  from './../services/http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpService) { }
  today: string;
  day: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  stocks: string[] = ["NASDAQ 1,000", "S&P 500"];
  dollars: number[] = [-11.9, 11.9];
  percentage: string[] = ["-0.2%", "0.12%"];

  marketStartHour: number = null;
  marketStartMin: number = null;
  interest: number = null;
  exchangeRate_US: string = null;
  exchangeRate_EU: string = null;

  ngOnInit() {
    var date = new Date();
    date.setHours(date.getHours() + 11);
    date.setMinutes(date.getMinutes() + 30);

    this.http.getInterestRate().subscribe(res => {
      var records: any[] = res.StatisticSearch.row;
      this.interest = records[records.length - 1].DATA_VALUE;
    });
    this.http.getUSexchangeRate().subscribe(res => {
      var rate: number = res.rates.KRW;
      this.exchangeRate_US = rate.toFixed(2) + " / USD";
    });
    this.http.getEUexchangeRate().subscribe(res => {
      var rate: number = res.rates.KRW;
      this.exchangeRate_EU = rate.toFixed(2) + " / EUR";
    });
    this.today = new Date().getFullYear().toString() + "." + (new Date().getMonth() + 1) + "." + new Date().getDate().toString() + " " + this.day[new Date().getDay()];
  }
}
