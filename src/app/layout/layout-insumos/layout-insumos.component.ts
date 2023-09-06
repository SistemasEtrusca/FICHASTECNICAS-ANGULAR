import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
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
  @ViewChild('carousel') carousel!: CarouselComponent;

  insumosArray: any[] = [];
  insumo: any; // Variable para almacenar el insumo actual
  extractedUrls: any;
  paramValue: string | undefined;
  qrCodeUrl: any;
  marcasArray: any[] = [];
  matchingMarca: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.insumosArray = await this.dataService.getInsumos();
      console.log('Información de insumosArray', this.insumosArray);

      await this.getInsumoFromRoute(); // Esperar a que se complete la obtención del insumo actual
    } catch (error) {
      console.error('Error al obtener datos de insumo', error);
      // Maneja el error según tus necesidades
    }
  }

  isMultipleImages(images: string[]): boolean {
    return images.length > 1;
  }

  async getInsumoFromRoute(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const keySap = params.get('keySap');
      this.insumo = this.insumosArray.find(insumo => insumo.keySap === keySap);
      console.log('Información del insumo actual:', this.insumo);

      // Esperar a que se carguen los datos de marcas
      await this.loadMarcasData();

      // Buscar la marca correspondiente en marcasArray

      // Convierte this.insumo.brand a un número
      const brandId = Number(this.insumo.brand);

      // Buscar la marca correspondiente en marcasArray
      this.matchingMarca = this.marcasArray.find(marca => marca.id === brandId);

      if (this.matchingMarca) {
        console.log('Marca correspondiente:', this.matchingMarca, this.matchingMarca.name);
        // Ahora puedes acceder a matchingMarca.image para mostrar la imagen en tu plantilla HTML
      } else {
        console.log('No se encontró una marca correspondiente.');
      }

      //Si hay urlArticle y no hemos extraído las URLs aún
      if (this.insumo && this.insumo.urlArticle) {
        this.extractUrlsFromString(this.insumo.urlArticle);
        //console.log(this.insumo.urlArticle);
      }

      //Generar código QR
      const dynamicUrl = this.generateDynamicUrl(this.insumo); // Cambia según tu lógica
      this.qrCodeUrl = dynamicUrl; // Asigna la URL generada al valor del código QR

      // Generar código de barras si la propiedad barCode no es null
      if (this.insumo && this.insumo.barCode !== null) {
        const barcodeDiv = document.getElementById('codeBarInsumo');
        //console.log(barcodeDiv, this.insumo.barCode);
        if (barcodeDiv) {
          JsBarcode(barcodeDiv, this.insumo.barCode, {
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

  async loadMarcasData(): Promise<void> {
    try {
      this.marcasArray = await this.dataService.getMarcas();
      console.log('Información de marcasArray', this.marcasArray);
    } catch (error) {
      console.error('Error al cargar datos de marcas', error);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
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
    return this.router.createUrlTree(['https://ficha-tecnica.cafeetrusca.com/insumos', insumo.keySap]).toString();
  }

  goToSlide(slideIndex: number): void {
    this.carousel.selectSlide(slideIndex);
  }
}





