import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/utils/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-layout-insumos',
  templateUrl: './layout-insumos.component.html',
  styleUrls: ['./layout-insumos.component.css']
})

export class LayoutInsumosComponent implements OnInit {
  insumosArray: any[] = [];
  insumo: any; // Variable para almacenar el insumo actual
  extractedUrls: any;

  constructor(
    private dataService: DataService, 
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
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
      console.log('Información del insumo actual:', this.insumo, 'foto', this.insumo.urlArticle);

      // Si hay urlArticle y no hemos extraído las URLs aún
      if (this.insumo && this.insumo.urlArticle) {
        this.extractUrlsFromString(this.insumo.urlArticle);
        console.log(this.insumo.urlArticle);
      }
    })
  }

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
}
