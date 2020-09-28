import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Index } from './../../models/index/index'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpService) { }
  stockNumber: number = 0;
  kospi: Index = null;
  kosdaq: Index = null;
  kospi200: Index = null;
  indexAvailable = false;

  async ngOnInit() {
    await this.http.getDayIndex().toPromise().then(res => {
      this.indexAvailable = true;
      var index = JSON.parse(res);
      this.kospi = index.KOSPI;
      this.kosdaq = index.KOSDAQ;
      this.kospi200 = index.KOSPI200;
    });
  }

  click_KOSPI() {
    this.stockNumber = 0;
    this.http.sendStockNumber(this.stockNumber);
  }
  
  click_KOSDAQ() {
    this.stockNumber = 1;
    this.http.sendStockNumber(this.stockNumber);
  }
  
  click_KOSPI200() {
    this.stockNumber = 2;
    this.http.sendStockNumber(this.stockNumber);
  }
}
