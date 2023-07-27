import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any[] | undefined;

  constructor() {
     this.fetchAllDataFromApis().then((data: any[]) => {
      this.data = data;
      console.log('Data obtenida:', this.data);
    }).catch((error: any) => {
      console.error('Error al obtener data:', error);
    });
  }
  
  async fetchDataFromApi(apiUrl: string): Promise<any> {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error}`);
    }
  }

  fetchAllDataFromApis(): Promise<any[]> {
    const api1Url = 'https://sap.etrusca.shop:8082/api/FichaTecnica?Depto=3';
    const api2Url = 'https://sap.etrusca.shop:8082/api/FichaTecnica?Depto=4';
    const api3Url = 'https://sap.etrusca.shop:8082/api/FichaTecnica?Depto=5';

    const api1Promise = this.fetchDataFromApi(api1Url);
    const api2Promise = this.fetchDataFromApi(api2Url);
    const api3Promise = this.fetchDataFromApi(api3Url);

    return Promise.all([api1Promise, api2Promise, api3Promise]);
  }

  // Puedes agregar más métodos según las necesidades de tu aplicación.
}
