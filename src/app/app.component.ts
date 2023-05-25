import { Component, OnInit } from '@angular/core';
import { DataService } from './servicios/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  elementosConId: any[] = [];

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    try {
      const data = await this.dataService.getData();
      this.elementosConId = data.filter((elemento) => elemento.hasOwnProperty('id'));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
}
