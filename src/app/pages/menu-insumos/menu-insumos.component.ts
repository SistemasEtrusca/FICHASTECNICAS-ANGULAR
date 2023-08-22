import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../utils/data.service';

@Component({
  selector: 'app-menu-insumos',
  templateUrl: './menu-insumos.component.html',
  styleUrls: ['./menu-insumos.component.css']
})


export class MenuInsumosComponent implements OnInit {
  insumosArray: any[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getInsumos().then((insumosArray: any[]) => {
      this.insumosArray = insumosArray;
      console.log('Información de insumosArray:', this.insumosArray );
    }).catch((error: any) => {
      console.error('Error al obtener datos de insumos:', error);
    })
  }
}
