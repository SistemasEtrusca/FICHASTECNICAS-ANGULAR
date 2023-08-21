import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-layout-insumos',
  templateUrl: './layout-insumos.component.html',
  styleUrls: ['./layout-insumos.component.css']
})

export class LayoutInsumosComponent implements OnInit {
  insumosArray: any[] = [];
  insumo: any; // Variable para almacenar el insumo actual

  constructor( private dataService: DataService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
      this.dataService.getInsumos().then((insumosArray: any[]) => {
        this.insumosArray = insumosArray;
        console.log('Información de insumosArray', this.insumosArray);
        this.getInsumoFromRoute(); //Llamamos a la función para obtener el insumo actual
      }).catch((error: any) => {
        console.error('Error al obtener datos de insumo', error);
      })
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  getInsumoFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar la información correspondiente en insumosArray por el valor de keySap
      this.insumo = this.insumosArray.find(insumo => insumo.keySap === keySap);
      console.log('Información del insumo actual:', this.insumo, 'foto', this.insumo.urlArticle);

      //Corrige el formato de urlArticule si es necesario
      this.insumo.urlArticle = this.insumo.urlArticle
        .replace("[", "")
        .replace("]", "")
        .replace(/'/g, "")
        .trim();
        return this.insumo
    })
  }
}
