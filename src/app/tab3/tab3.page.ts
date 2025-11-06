import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesServices } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements  OnInit{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGeneros: any[] = [];


  constructor(private dataLocal: DataLocalService,
              private moviesService: MoviesServices
  ) {}

  ngOnInit(){
  }

  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarPeliculas();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);

  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
      this.favoritoGeneros = [];

      generos.forEach( genero => {
        this.favoritoGeneros.push({
          genero: genero.name,
          pelis: peliculas.filter( peli =>{
            return peli.genres.find( genre => genre.id === genero.id );
          } )
        });
      });
      console.log(this.favoritoGeneros);
  }

}
