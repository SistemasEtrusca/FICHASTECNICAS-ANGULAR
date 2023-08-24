import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../utils/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-layout-maquinaria',
  templateUrl: './layout-maquinaria.component.html',
  styleUrls: ['./layout-maquinaria.component.css'],
})

export class LayoutMaquinariaComponent implements OnInit {
  maquinariaArray: any[] = []; // Array de maquinas
  maquina: any; // Variable para almacenar la máquina actual
  extractedUrls: any;
  paramValue: string | undefined;
  qrCodeUrl: any;
  imagen360: string | undefined;
  urlIframe: string | undefined;
  hideImages = false; // Puedes inicializarlo según tus necesidades
  hide360 = false; // Puedes inicializarlo según tus necesidades


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.dataService.getMaquinaria().then((maquinariaArray: any[]) => {
      this.maquinariaArray = maquinariaArray;
      //console.log('Información de maquinariaArray:', this.maquinariaArray);
      this.getMaquinaFromRoute(); // Llama a la función para obtener la máquina actual
    }).catch((error: any) => {
      console.error('Error al obtener datos de maquinaria:', error);
    });
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  getMaquinaFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar la máquina correspondiente en maquinariaArray por el valor de keySap
      this.maquina = this.maquinariaArray.find(maquina => maquina.keySap === keySap);
      //console.log('Información de la máquina actual:', this.maquina, 'foto:', this.maquina.urlArticle);

      // Si hay urlArticle y no hemos extraído las URLs aún
      if (this.maquina && this.maquina.urlArticle) {
        this.extractUrlsFromString(this.maquina.urlArticle);
        console.log(this.maquina.urlArticle);
      }

      //Generar código QR
      const dynamicUrl = this.generateDynamicUrl(this.maquina); // Cambia según tu lógica
      this.qrCodeUrl = dynamicUrl; // Asigna la URL generada al valor del código QR

      // Generar código de barras si la propiedad barCode no es null
      if (this.maquina && this.maquina.barCode !== null) {
        const barcodeDiv = document.getElementById('codeBar');
        console.log(barcodeDiv, this.maquina.barCode);
        if (barcodeDiv) {
          JsBarcode(barcodeDiv, this.maquina.barCode, {
            margin: 10,
            background: "#ffffff",
            lineColor: "#000000",
            width: 4,
            height: 100,
            textMargin: 4,
            font: "monospace",
          });
        }
      } else {
        // Si barCode es null, ocultar el div
        const barcodeDiv = document.getElementById('codeBar');
        if (barcodeDiv) {
          barcodeDiv.style.display = 'none';
        }
      }
    });
    //Imagenes 360°
    this.imagen360 = this.maquina.keySap.toLowerCase().replace(/-/g, '_');
    const concatenatedURL = `https://cafeetrusca.com/360/${this.imagen360}.html`;

    const urlIsValid = this.isValidURL(concatenatedURL);

    if (urlIsValid) {
      this.hideImages = true;
      const imagenes = document.getElementById('imagenes-carrusel');
      if (imagenes) {
        this.renderer.addClass(imagenes, 'd-none');
      }


      const safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(concatenatedURL);   //Marca la URL como segura utilizando el DomSanitizer
      this.maquina.urlIframe = safeURL
    } else {
      console.log('La URL no es válida');
    }
  }

  // Ajusta 'ruta' al valor correcto de la ruta que estás utilizando en tus componentes
  generateDynamicUrl(maquina: any): string {
    return this.router.createUrlTree(['/ruta', maquina.keySap]).toString();
  }

  //Limpia las url de las imagenes de la máquina
  extractUrlsFromString(input: string): void {
    const cleanedInput = input
      .replace(/\[|\]|'/g, ''); // Elimina '[' ']' y comillas simples

    // Si cleanedInput contiene caracteres después de limpiar, consideramos que es una URL válida
    if (cleanedInput.trim().length > 0) {
      const urls = cleanedInput
        .split(',')
        .map(url => url.trim());

      this.extractedUrls = urls;
    } else {
      this.extractedUrls = []; // No hay URLs válidas
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  isValidURL(url: string): boolean {
    // Utilizamos una expresión regular similar para verificar si la URL tiene un formato válido
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  }

}

