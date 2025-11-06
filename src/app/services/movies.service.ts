import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesServices {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() ;
    let mesString;

    if (mes < 10) {
      mesString = `0${mes}`;
    } else {
      mesString = `${mes}`;
    }

    const fechaInicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fechaFin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${fechaInicio}&primary_release_date.lte=${fechaFin}`);

  }

  getPopulares(){
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.des&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);

  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getBuscarPeliculas(texto: string){
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp: any) => {
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }

}
