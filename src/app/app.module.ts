import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccesoriosComponent } from './layout/accesorios/accesorios.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DescriptionComponent } from './components/description/description.component';
import { ImagenProductoComponent } from './components/imagen-producto/imagen-producto.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { TableCharacteristicsComponent } from './components/table-characteristics/table-characteristics.component';
import { CodebarComponent } from './components/codebar/codebar.component';
import { CodeQRComponent } from './components/code-qr/code-qr.component';

@NgModule({
  declarations: [
    AppComponent,
    AccesoriosComponent,
    HeaderComponent,
    FooterComponent,
    DescriptionComponent,
    ImagenProductoComponent,
    IngredientsComponent,
    TableCharacteristicsComponent,
    CodebarComponent,
    CodeQRComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
