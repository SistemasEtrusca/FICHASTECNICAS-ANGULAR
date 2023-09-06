import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../utils/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-layout-accesorios',
  templateUrl: './layout-accesorios.component.html',
  styleUrls: ['./layout-accesorios.component.css']
})

export class LayoutAccesoriosComponent implements OnInit {
  @ViewChild('carousel') carousel!: CarouselComponent;

  accesoriosArray: any[] = [];
  accesorio: any; // Variable para almacenar el accesorio actual
  extractedUrls: any;
  qrCodeUrl: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
   
  ) { }

  ngOnInit(): void {
    this.dataService.getAccesorios().then((accesoriosArray: any[]) => {
      this.accesoriosArray = accesoriosArray;
      console.log('Información de accesoriosArray', this.accesoriosArray);
      this.getAccesoriosFromRoute(); //Llamamos a la función para obtener el accesorio actual
    }).catch((error: any) => {
      console.error('Error al obtener datos de accesorios: ', error);
    });
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  getAccesoriosFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const keySap = params.get('keySap');
      // Buscar el accesorio correspondiente en maquinariaArray por el valor de keySap
      this.accesorio = this.accesoriosArray.find(accesorio => accesorio.keySap === keySap);
      console.log('Información de la máquina actual:', this.accesorio, 'foto:', this.accesorio.urlArticle);

      // Si hay urlArticle y no hemos extraído las URLs aún
      if (this.accesorio && this.accesorio.urlArticle) {
        this.extractUrlsFromString(this.accesorio.urlArticle);
        console.log(this.accesorio.urlArticle);
      }

      //Generar código QR
      const dynamicUrl = this.generateDynamicUrl(this.accesorio); // Cambia según tu lógica
      this.qrCodeUrl = dynamicUrl; // Asigna la URL generada al valor del código QR
      
      // Generar código de barras si la propiedad barCode no es null
      if (this.accesorio && this.accesorio.barCode !== null) {
        const barcodeDiv = document.getElementById('codeBars');
        console.log(barcodeDiv, this.accesorio.barCode);
        if (barcodeDiv) {
          JsBarcode(barcodeDiv, this.accesorio.barCode, {
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

  }

  //Limpia las url de las imagenes de accesorio
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

    // Ajusta 'ruta' al valor correcto de la ruta que estás utilizando en tus componentes
    generateDynamicUrl(maquina: any): string {
      return this.router.createUrlTree(['https://ficha-tecnica.cafeetrusca.com/accesorios', maquina.keySap]).toString();
    }

    goToSlide(slideIndex: number): void {
      this.carousel.selectSlide(slideIndex);
    }
}
