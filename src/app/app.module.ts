import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutAccesoriosComponent } from './layout/layout-accesorios/layout-accesorios.component';
import { LayoutMaquinariaComponent } from './layout/layout-maquinaria/layout-maquinaria.component';
import { DataService } from './services/data.service';
import { menuMaquinariaComponent } from './menuMaquinaria/menuMaquinaria.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MenuInsumosComponent } from './menu-insumos/menu-insumos.component';
import { MenuAccesoriosComponent } from './menu-accesorios/menu-accesorios.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutAccesoriosComponent,
    LayoutMaquinariaComponent,
    menuMaquinariaComponent,
    NavbarComponent,
    HomeComponent,
    MenuInsumosComponent,
    MenuAccesoriosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
