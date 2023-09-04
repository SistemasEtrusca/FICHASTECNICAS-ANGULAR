import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../../utils/data.service';

@Component({
  selector: 'app-menu-accesorios',
  templateUrl: './menu-accesorios.component.html',
  styleUrls: ['./menu-accesorios.component.css']
})
export class MenuAccesoriosComponent implements OnInit{
  accesoriosArray: any[] =[];

  constructor( private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getAccesorios().then((accesoriosArray: any[]) => {
      this.accesoriosArray = accesoriosArray;
      console.log('Información de AccesoriosArray:', this.accesoriosArray);
    }).catch((error: any) => {
      console.error('Error al obtener datos de accesorios:', error);
    }); 
  }
}
