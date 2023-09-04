import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any[] | undefined;
  maquinariaArray: any[] = []; // Propiedad para almacenar maquinariaArray
  insumosArray: any[] = [];// Propiedad para almacenar insumosArray
  accesoriosArray: any[] = [] //Propiedad para almacenar accesoriosArray

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {

    this.fetchAllDataFromApis().then((data: any[]) => {

      this.data = data;

      // Maquinaria: convertir this.data[2] en un array de objetos desestructurado
      this.maquinariaArray = this.data[2].map((item: any) => ({
        brand: item.brand,
        barCode: item.barcode,
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
        width: item.width,
        warranty: item.warranty,
        voltage: item.voltage,
      }));

      //console.log('Maquinaria como array de objetos:', this.maquinariaArray);

      //Accesorios: convertir this.data[1] en un array de objetos desestructurado;
      this.accesoriosArray = this.data[1].map((item: any) => ({
        name: item.name,
        keySap: item.keySap,
        brand: item.brand,
        category: item.category,
        subCategory: item.subCategory,
        description: item.description,
        barCode: item.barCode,
        color: item.color,
        urlArticle: item.urlArticle,
        weight: item.weight,
        width: item.width,
        volume: item.volume,
      }))

      //console.log('Accesorios como array de objetos:', this.accesoriosArray);

      // Insumos: convertir this.data[0] en un array de objetos desestructurado;
      this.insumosArray = this.data[0].map((item: any) => ({
        name: item.name,
        keySap: item.keySap,
        barCode: item.barcode,
        brand: item.brand,
        category: item.category,
        flavor: item.flavor,
        description: item.description,
        presentation: item.presentation,
        urlArticle: item.urlArticle,
        contNeto: item.contNeto,
        weight: item.weight,
        width: item.width,
        height: item.height,
        certification: item.certification,
        ingredients: item.ingredients,
        //observations: item.observations,
        //ingredients: item.ingredients
      }));

      //console.log('Insumos como array de objetos:', this.insumosArray);

      //console.log('Data obtenida:', this.data);
      console.log(`
  ---------------------
 |                     |
 |   ¡Ya hicimos la    |
 |  petición de data!  |
 |                     |
  ---------------------
          \\(^_^)/
`);

    }).catch((error: any) => {
      console.error('Error al obtener data:', error);
    });
  }

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  async fetchDataFromApi(apiUrl: string, type: string): Promise<any> {
    try {
      this.setLoading(true); // Activar el estado de carga
      const dataFromStorage = localStorage.getItem('data');
      const lastUpdate = localStorage.getItem('lastUpdate');
      const currentDate = new Date();

      if (dataFromStorage && lastUpdate && !this.hasPassedADay(lastUpdate, currentDate)) {
        console.log('Obteniendo datos almacenados en localStorage');
        return JSON.parse(dataFromStorage);
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`);
      }

      const newData = await response.json();
      localStorage.setItem('data_' + type, JSON.stringify(newData));
      localStorage.setItem('lastUpdate', this.formatDate(currentDate));

      console.log('Datos actualizados y guardados en localStorage');
      return newData;

    } catch (error) {
      throw new Error(`Error fetching data from API: ${error}`);
    } finally {
      this.setLoading(false); // Desactivar el estado de carga sin importar si hubo un error
    }
  }

  hasPassedADay(lastUpdate: string, currentDate: Date): boolean {
    const lastUpdateDate = new Date(lastUpdate);
    const oneDay = 24 * 60 * 60 * 1000; // Un día en milisegundos
    return currentDate.getTime() - lastUpdateDate.getTime() < oneDay;
  }

  formatDate(date: Date): string {
    return date.toISOString(); // Puedes cambiar el formato según tus preferencias
  }

  fetchAllDataFromApis(): Promise<any[]> {
    const api1Url = 'https://sap.etrusca.shop/api/FichaTecnica?Depto=3';
    const api2Url = 'https://sap.etrusca.shop/api/FichaTecnica?Depto=4';
    const api3Url = 'https://sap.etrusca.shop/api/FichaTecnica?Depto=5';

    const api1Promise = this.fetchDataFromApi(api1Url, 'insumos');
    const api2Promise = this.fetchDataFromApi(api2Url, 'accesorios');
    const api3Promise = this.fetchDataFromApi(api3Url, 'maquinaria');

    return Promise.all([api1Promise, api2Promise, api3Promise]);
  }

  // Método para obtener la información procesada y formateada de maquinariaArray
  getMaquinaria(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const storedData = localStorage.getItem('data_maquinaria');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        resolve(parsedData);
      } else {
        this.fetchAllDataFromApis().then(() => {
          resolve(this.maquinariaArray);
        }).catch((error: any) => {
          reject(error);
        });
      }
    });
  }

  // Método para obtener la información procesada y formateada de insumosArray
  getInsumos(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const storedData = localStorage.getItem('data_insumos');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        resolve(parsedData);
      } else {
        this.fetchAllDataFromApis().then(() => {
          resolve(this.insumosArray);
        }).catch((error: any) => {
          reject(error);
        });
      }
    });
  }


  //Método para obtener la información procesada y formateada de accesoriosArray
  getAccesorios(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const storedData = localStorage.getItem('data_accesorios');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        resolve(parsedData);
      } else {
        this.fetchAllDataFromApis().then(() => {
          resolve(this.accesoriosArray);
        }).catch((error: any) => {
          reject(error);
        });
      }
    });
  }
}
