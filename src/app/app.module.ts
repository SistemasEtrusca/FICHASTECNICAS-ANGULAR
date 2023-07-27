import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DescriptionComponent } from './components/description/description.component';
import { ImagenProductoComponent } from './components/imagen-producto/imagen-producto.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { TableCharacteristicsComponent } from './components/table-characteristics/table-characteristics.component';
import { CodebarComponent } from './components/codebar/codebar.component';
import { CodeQRComponent } from './components/code-qr/code-qr.component';
import { LayoutAccesoriosComponent } from './layout/layout-accesorios/layout-accesorios.component';
import { LayoutMaquinariaComponent } from './layout/layout-maquinaria/layout-maquinaria.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DescriptionComponent,
    ImagenProductoComponent,
    IngredientsComponent,
    TableCharacteristicsComponent,
    CodebarComponent,
    CodeQRComponent,
    LayoutAccesoriosComponent,
    LayoutMaquinariaComponent,
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
