import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../utils/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-layout-maquinaria',
  templateUrl: './layout-maquinaria.component.html',
  styleUrls: ['./layout-maquinaria.component.css']
})

export class LayoutMaquinariaComponent implements OnInit {
  maquinariaArray: any[] = [];
  maquina: any; // Variable para almacenar la máquina actual
  extractedUrls: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.dataService.getMaquinaria().then((maquinariaArray: any[]) => {
      this.maquinariaArray = maquinariaArray;
      //console.log('Información de maquinariaArray:', this.maquinariaArray);
      this.getMaquinaFromRoute(); // Llamamos a la función para obtener la máquina actual
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
      if (this.maquina && this.maquina.urlArticle ) {
        this.extractUrlsFromString(this.maquina.urlArticle);
        console.log(this.maquina.urlArticle);
      }
    });
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
