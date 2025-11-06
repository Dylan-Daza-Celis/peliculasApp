import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage,
              private toastCtrl: ToastController
   ) {
     this.init();
     this.cargarPeliculas()
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });

    await toast.present();
  }

  async init() {
    // Crea o recupera la base de datos
    const storage = await this.storage.create();
    this._storage = storage;

  }

  async guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';
    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removida de favoritos';
    }else{
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }
    this.presentToast(mensaje);
    await this._storage?.set('peliculas', this.peliculas);

  }

  async cargarPeliculas() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id:any) {
    id = Number(id);
    await this.init();
    const existe = this.peliculas.find(peli => peli.id === id);
    return existe ? true : false;
  }



}
