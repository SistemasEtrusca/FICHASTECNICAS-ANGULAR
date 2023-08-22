import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // El código del servicio DataService se ejecutará automáticamente al iniciar la aplicación
    this.isLoading$ = this.dataService.isLoading$;
    this.loadData();
  }

  async loadData() {
    try {
      await this.dataService.fetchAllDataFromApis();
      // Procesar los datos recibidos
    } catch (error) {
      console.error(error);
    }
  }
}
