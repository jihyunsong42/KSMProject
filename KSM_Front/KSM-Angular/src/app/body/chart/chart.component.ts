import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HttpService } from './../../services/http.service';
import { MonthChart } from './../../models/charts/month-chart';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  constructor(private http: HttpService) { }

  monthChart: MonthChart;
  dataSets: number[][] = [];


  public options: any = {
    chart: {
      height: 350
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return this.y + " KRW\n" + Highcharts.dateFormat('%d %B %Y', this.x);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%d %b %Y', this.value);
        }
      }
    },
    yAxis: {
      title: {
        text: "Closing Price"
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: this.dataSets
      }
    ],
    rangeSelector: {
      buttons: [{
        type: 'day',
        count: 1,
        text: '1d',
      }, {
        type: 'week',
        count: 1,
        text: '1w'
      }, {
        type: 'month',
        count: 1,
        text: '1m'
      }, {
        type: 'month',
        count: 3,
        text: '3m'
      }, {
        type: 'month',
        count: 6,
        text: '6m'
      }, {
        type: 'ytd',
        text: 'YTD'
      }, {
        type: 'year',
        count: 1,
        text: '1y'
      }, {
        type: 'year',
        count: 5,
        text: '5y'
      }, {
        type: 'year',
        count: 10,
        text: '10y'
      }]
    },
  }

  ngOnInit() {
    this.http.getMonthChart().subscribe((res: MonthChart) => {
      this.monthChart = res;
      var endPrice = this.monthChart.EndPrice;

      Object.keys(endPrice).forEach((res, i) => {
        var dataSet: number[] = [parseInt(res), endPrice[res]];
        this.dataSets.push(dataSet);
      })
      Highcharts.stockChart('container', this.options);
    });


  }

}
