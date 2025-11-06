import { Component } from '@angular/core';
import { MoviesServices } from '../services/movies.service';
import { Pelicula, } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  textoBuscar: string = '';
  buscando: boolean = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'Venom',
    'Iron man',
    'Capitan America',
    'Thor',
    'Hulk',
    'Antman',
    'Doctor Strange'
  ];

  constructor(private movieServices: MoviesServices,
              private modalCtrl: ModalController
  ) {}

  buscar(event: any) {
    this.buscando = true;
    const valor = event.detail.value;
    if (!(valor.length === 0)) {
      this.movieServices.getBuscarPeliculas(valor)
      .subscribe((resp: any) => {
        this.peliculas = resp['results'];
      });
      this.buscando = false;
      return;
    }
    this.buscando = false;
    this.peliculas = [];
    this.textoBuscar = '';

  }

  recomendacion(recomendacion: string) {
    this.textoBuscar = recomendacion;
    this.buscar({ detail: { value: recomendacion } });
  }

  async detalle(id: any) {
    const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
              id
            }
          });

          modal.present();
  }
}
