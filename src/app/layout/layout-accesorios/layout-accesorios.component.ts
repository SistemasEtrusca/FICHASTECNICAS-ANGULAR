import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-layout-accesorios',
  templateUrl: './layout-accesorios.component.html',
  styleUrls: ['./layout-accesorios.component.css']
})

export class LayoutAccesoriosComponent {
  accesoriosArray: any[] =[];
  accesorio: any; // Variable para almacenar el accesorio actual

  constructor( private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getAccesorios().then((accesoriosArray: any[]) => {
      this.accesoriosArray = accesoriosArray;
      console.log('Información de accesoriosArray', this.accesoriosArray);
      this.getAccesoriosFromRoute(); //Llamamos a la función para obtener el accesorio actual
    }).catch((error: any) => {
      console.error('Error al obtener datos de accesorios: ', error);
    });
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  getAccesoriosFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar el accesorio correspondiente en maquinariaArray por el valor de keySap
      this.accesorio = this.accesoriosArray.find(accesorio => accesorio.keySap === keySap);
      console.log('Información de la máquina actual:', this.accesorio, 'foto:', this.accesorio.urlArticle);
      
      // Corrige el formato de urlArticle si es necesario
      this.accesorio.urlArticle = this.accesorio.urlArticle
        .replace("[", "")
        .replace("]", "")
        .replace(/'/g, "")
        .trim();
      return this.accesorio;
    }); 
  }
}
