import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-layout-maquinaria',
  templateUrl: './layout-maquinaria.component.html',
  styleUrls: ['./layout-maquinaria.component.css']
})
export class LayoutMaquinariaComponent implements OnInit {
  maquinariaArray: any[] = [];
  maquina: any; // Variable para almacenar la máquina actual

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getMaquinaria().then((maquinariaArray: any[]) => {
      this.maquinariaArray = maquinariaArray;
      console.log('Información de maquinariaArray:', this.maquinariaArray);
      this.getMaquinaFromRoute(); // Llamamos a la función para obtener la máquina actual
    }).catch((error: any) => {
      console.error('Error al obtener datos de maquinaria:', error);
    });
  }

  getMaquinaFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar la máquina correspondiente en maquinariaArray por el valor de keySap
      this.maquina = this.maquinariaArray.find(maquina => maquina.keySap === keySap);
      console.log('Información de la máquina actual:', this.maquina, 'foto:', this.maquina.urlArticle);
    });
  }
}
