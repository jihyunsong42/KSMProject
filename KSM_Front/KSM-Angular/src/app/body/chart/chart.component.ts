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
  chartAvailable: number = 3;
  stockName: string = "KOSPI";

  kospiDataSets: number[][] = [];
  kosdaqDataSets: number[][] = [];
  kospi200DataSets: number[][] = [];


  public kospiOptions: any = {
    chart: {
      height: 350
    },
    title: {
      text: "KOSPI"
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
        data: this.kospiDataSets
      }
    ],
    rangeSelector: {
      buttons: [{
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
      }]
    },
  }

  public kosdaqOptions: any = {
    chart: {
      height: 350
    },
    title: {
      text: "KOSDAQ"
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
        data: this.kosdaqDataSets
      }
    ],
    rangeSelector: {
      buttons: [{
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
      }]
    },
  }

  public kospi200Options: any = {
    chart: {
      height: 350
    },
    title: {
      text: "KOSPI 200"
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
        data: this.kospi200DataSets
      }
    ],
    rangeSelector: {
      buttons: [{
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
      }]
    },
  }

  async ngOnInit() {
    await this.http.getKospiChart().toPromise().then((res: MonthChart) => {
      console.log(res);
      this.stockName = "KOSPI";
      this.monthChart = res;
      var endPrice = this.monthChart.EndPrice;

      Object.keys(endPrice).forEach((res) => {
        var dataSet: number[] = [parseInt(res), endPrice[res]];
        this.kospiDataSets.push(dataSet);
      });

    });
    this.chartAvailable = 0;
    Highcharts.stockChart('KOSPIcontainer', this.kospiOptions);

    this.http.$receiveStockNumber.subscribe(async number => {
      if (this.chartAvailable != number) {
        this.chartAvailable = 3;

        if (number == 0) { // KOSPI 
          await this.http.getKospiChart().toPromise().then(res => {
            this.monthChart = res;
            console.log(this.monthChart);
            var endPrice = this.monthChart.EndPrice;
            Object.keys(endPrice).forEach((res) => {
              var dataSet: number[] = [parseInt(res), endPrice[res]];
              this.kospiDataSets.push(dataSet);
            });
          });
          this.chartAvailable = 0;
          Highcharts.stockChart('KOSPIcontainer', this.kospiOptions);

        }
        else if (number == 1) { // KOSDAQ

          await this.http.getKosdaqChart().toPromise().then(res => {
            this.monthChart = res;
            console.log(this.monthChart);
            var endPrice = this.monthChart.EndPrice;
            Object.keys(endPrice).forEach((res) => {
              var dataSet: number[] = [parseInt(res), endPrice[res]];
              this.kosdaqDataSets.push(dataSet);
            });
          });
          this.chartAvailable = 1;
          Highcharts.stockChart('KOSDAQcontainer', this.kosdaqOptions);
        }
        else if (number == 2) { // KOSPI 200        
          await this.http.getKospi200Chart().toPromise().then(res => {
            this.monthChart = res;
            var endPrice = this.monthChart.EndPrice;
            Object.keys(endPrice).forEach((res) => {
              var dataSet: number[] = [parseInt(res), endPrice[res]];
              this.kospi200DataSets.push(dataSet);
            });
          });
          this.chartAvailable = 2;
          Highcharts.stockChart('KOSPI200container', this.kospi200Options);
        }
        else {
          console.log("Initial number value : 3")
        }
      }
    });
  }
}
