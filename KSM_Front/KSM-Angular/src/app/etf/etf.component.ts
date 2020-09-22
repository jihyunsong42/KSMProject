import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-etf',
  templateUrl: './etf.component.html',
  styleUrls: ['./etf.component.css']
})
export class ETFComponent implements OnInit {

  constructor(private http: HttpClient) { }

  
  ngOnInit() {

  }

}
