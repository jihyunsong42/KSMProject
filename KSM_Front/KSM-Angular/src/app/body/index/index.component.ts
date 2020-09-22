import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
  stockNumber: number = 0;
  ngOnInit() {
  }

  click_KOSPI() {
    this.stockNumber = 0;
  }
  
  click_KOSDAQ() {
    this.stockNumber = 1;
  }
  
  click_KOSPI200() {
    this.stockNumber = 2;
  }
}
