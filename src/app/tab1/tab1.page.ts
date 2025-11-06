import { Component, OnInit} from '@angular/core';
import { MoviesServices } from '../services/movies.service';
import { Pelicula, } from '../interfaces/interfaces';
import { register } from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares : Pelicula[] = [];


  constructor(private moviesService: MoviesServices) {}

  ngOnInit() {
    this.moviesService.getFeature()
    .subscribe( (resp) => {
        this.peliculasRecientes = resp.results;
      }
    );

    this.getPopulares();


  }

  cargarMas(){

    this.getPopulares();

  }

  getPopulares(){
    this.moviesService.getPopulares()
    .subscribe( resp => {
        const arrTemp = [ ...this.populares, ...resp.results ];

        this.populares = arrTemp;
      });

  }

}
