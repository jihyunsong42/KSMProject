import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  private url: string = "http://localhost:8000/";
  
  // header service
  public getMarketStartEndTime(): Observable<any> {
    return this.http.get(this.url + "getMarketStartEndTime");
  }
  public getInterestRate(): Observable<any> {
    return this.http.get(this.url + "getInterestRate");
  }
  public getUSexchangeRate(): Observable<any> {
    return this.http.get(this.url + "getUSexchangeRate");
  }
  public getEUexchangeRate(): Observable<any> {
    return this.http.get(this.url + "getEUexchangeRate");
  }

  // chart service
  public getMonthChart(): Observable<any> {
    return this.http.get(this.url + "getMonthChart");
  }
  
}
