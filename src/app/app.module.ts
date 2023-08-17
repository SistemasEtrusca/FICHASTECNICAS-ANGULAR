import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutAccesoriosComponent } from './layout/layout-accesorios/layout-accesorios.component';
import { LayoutMaquinariaComponent } from './layout/layout-maquinaria/layout-maquinaria.component';
import { DataService } from './services/data.service';
import { menuMaquinariaComponent } from './menuMaquinaria/menuMaquinaria.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutAccesoriosComponent,
    LayoutMaquinariaComponent,
    menuMaquinariaComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
