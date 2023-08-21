import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMaquinariaComponent } from './layout/layout-maquinaria/layout-maquinaria.component';
import { HomeComponent } from './home/home.component';
import { menuMaquinariaComponent } from './menuMaquinaria/menuMaquinaria.component';
import { MenuInsumosComponent } from './menu-insumos/menu-insumos.component';
import { LayoutInsumosComponent } from './layout/layout-insumos/layout-insumos.component';
import { MenuAccesoriosComponent } from './menu-accesorios/menu-accesorios.component';
import { LayoutAccesoriosComponent } from './layout/layout-accesorios/layout-accesorios.component';


const routes: Routes = [
  // Otras rutas de tu aplicación...
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'maquinaria', component: menuMaquinariaComponent},
  { path: 'maquinaria/:keySap', component: LayoutMaquinariaComponent },
  { path: 'insumos', component: MenuInsumosComponent},
  { path: 'insumos/:keySap', component: LayoutInsumosComponent},
  { path: 'accesorios', component: MenuAccesoriosComponent },
  { path: 'accesorios/:keySap', component: LayoutAccesoriosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
