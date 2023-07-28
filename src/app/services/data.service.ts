import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any[] | undefined;
  maquinariaArray: any[] = []; // Propiedad para almacenar maquinariaArray

  constructor() {
    this.fetchAllDataFromApis().then((data: any[]) => {
      this.data = data;

      // Maquinaria: convertir this.data[2] en un array de objetos desestructurado
      this.maquinariaArray = this.data[2].map((item: any) => ({
        brand: item.brand,
        category: item.category,
        color: item.color,
        depto: item.depto,
        description: item.description,
        height: item.height,
        itemCode: item.itemCode,
        keySap: item.keySap,
        name: item.name,
        salesUnit: item.salesUnit,
        salesUnitlenght: item.salesUnitlenght,
        urlArticle: item.urlArticle,
        volume: item.volume,
        weight: item.weight,
        width: item.width
      }));

      console.log('Maquinaria como array de objetos:', this.maquinariaArray);

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

  // Método para obtener la información procesada y formateada de maquinariaArray
  getMaquinaria(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.fetchAllDataFromApis().then(() => {
        resolve(this.maquinariaArray);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  // Puedes agregar más métodos según las necesidades de la aplicación.
}
