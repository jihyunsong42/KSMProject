import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ETFComponent } from './etf/etf.component';

const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
