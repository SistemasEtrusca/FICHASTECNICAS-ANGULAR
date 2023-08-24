import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/utils/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-layout-insumos',
  templateUrl: './layout-insumos.component.html',
  styleUrls: ['./layout-insumos.component.css']
})

export class LayoutInsumosComponent implements OnInit {
  insumosArray: any[] = [];
  insumo: any; // Variable para almacenar el insumo actual
  extractedUrls: any;
  paramValue: string | undefined;
  qrCodeUrl: any;

  constructor(
    private dataService: DataService, 
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.dataService.getInsumos().then((insumosArray: any[]) => {
      this.insumosArray = insumosArray;
      console.log('Información de insumosArray', this.insumosArray);
      this.getInsumoFromRoute(); //Llamamos a la función para obtener el insumo actual
    }).catch((error: any) => {
      console.error('Error al obtener datos de insumo', error);
    })
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  getInsumoFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar la información correspondiente en insumosArray por el valor de keySap
      this.insumo = this.insumosArray.find(insumo => insumo.keySap === keySap);
      //console.log('Información del insumo actual:', this.insumo, 'foto', this.insumo.urlArticle);

      //Si hay urlArticle y no hemos extraído las URLs aún
      if (this.insumo && this.insumo.urlArticle) {
        this.extractUrlsFromString(this.insumo.urlArticle);
        console.log(this.insumo.urlArticle);
      }

      //Generar código QR
      const dynamicUrl = this.generateDynamicUrl(this.insumo); // Cambia según tu lógica
      this.qrCodeUrl = dynamicUrl; // Asigna la URL generada al valor del código QR
    })
  }

  //Limpia las url de las imagenes del insumo
  extractUrlsFromString(input: string): void {
    const cleanedInput = input
      .replace(/\[|\]|'/g, ''); // Elimina '[' ']' y comillas simples

    // Si cleanedInput contiene caracteres después de limpiar, consideramos que es una URL válida
    if (cleanedInput.trim().length > 0) {
      const urls = cleanedInput
        .split(',')
        .map(url => url);
       // console.log(urls);

      this.extractedUrls = urls;
    } else {
      this.extractedUrls = []; // No hay URLs válidas
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Ajusta 'ruta' al valor correcto de la ruta que estás utilizando en tus componentes
  generateDynamicUrl(insumo: any): string {
    return this.router.createUrlTree(['/ruta', insumo.keySap]).toString();
  }
}


