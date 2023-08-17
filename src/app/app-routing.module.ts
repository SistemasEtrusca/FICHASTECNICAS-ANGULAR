import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMaquinariaComponent } from './layout/layout-maquinaria/layout-maquinaria.component';
import { HomeComponent } from './home/home.component';
import { menuMaquinariaComponent } from './menuMaquinaria/menuMaquinaria.component';


const routes: Routes = [
  // Otras rutas de tu aplicación...
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'maquinaria', component: menuMaquinariaComponent},
  { path: 'maquinaria/:keySap', component: LayoutMaquinariaComponent },
  // Otras rutas de tu aplicación...
  // Otras rutas de tu aplicación...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
