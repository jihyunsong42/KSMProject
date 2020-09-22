import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ETFComponent } from './etf/etf.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { ChartComponent } from './body/chart/chart.component';
import { IndexComponent } from './body/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    ETFComponent,
    HeaderComponent,
    BodyComponent,
    ChartComponent,
    IndexComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
