import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-layout-maquinaria',
  templateUrl: './layout-maquinaria.component.html',
  styleUrls: ['./layout-maquinaria.component.css']
})
export class LayoutMaquinariaComponent implements OnInit {
  maquinariaArray: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMaquinaria().then((maquinariaArray: any[]) => {
      this.maquinariaArray = maquinariaArray;
      console.log('Información de maquinariaArray:', this.maquinariaArray);
    }).catch((error: any) => {
      console.error('Error al obtener datos de maquinaria:', error);
    });
  }
}