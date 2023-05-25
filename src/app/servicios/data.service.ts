import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DataResponse {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: Array<any>;
    input: Array<any>;
  }  

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  async getData(): Promise<any[]> {
    try {
      const datas = await this.http.get<DataResponse>('https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1').toPromise();
      if (datas?.data) {
        const dataArray = datas.data;
        const elementosConId = [];
        for (const elemento of dataArray) {
          if (elemento.hasOwnProperty('id')) {
            elementosConId.push(elemento);
            console.log(elementosConId);
          }
        }
        return elementosConId;
      } else {
        throw new Error('No se encontraron datos válidos.');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return []; // O devuelve un valor predeterminado en caso de error
    }
  }
}
