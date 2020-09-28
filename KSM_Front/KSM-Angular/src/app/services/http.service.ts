import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  // private url: string = "http://localhost:8000/";
  private url: string = "https://ksm-azure.azurewebsites.net/"; // Production Mode
  private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
  private options = { headers: this.headers };
  
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

  public getDayIndex(): Observable<any> {
    return this.http.get(this.url + "getDayIndex");
  }

  // chart service
  public getKospiChart(): Observable<any> {
    return this.http.get(this.url + "getKospiChart");
  }
  public getKosdaqChart(): Observable<any> {
    return this.http.get(this.url + "getKosdaqChart");
  }
  public getKospi200Chart(): Observable<any> {
    return this.http.get(this.url + "getKospi200Chart");
  }

  // stock type switch
  streamStockNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  $receiveStockNumber: Observable<number> = this.streamStockNumber.asObservable();

  public sendStockNumber(i: number) {
    this.streamStockNumber.next(i);
  }
  
}
