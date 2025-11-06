import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MoviesServices } from '../../services/movies.service';
import { Cast, Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {
  @ViewChild('swiperEl', { static: false }) swiperEl!: ElementRef;

  @Input() id: String ;

  pelicula: PeliculaDetalle
  actores: Cast[] = [];
  oculto = 150;
  existe: boolean = false;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesServices,
              private  modalCtrl: ModalController,
              private dataLocalService: DataLocalService
  ) {
    this.id = '';
    this.pelicula = {} as PeliculaDetalle;
   }

  async ngOnInit() {
    this.existe = await this.dataLocalService.existePelicula(this.id);
    
    this.moviesService.getPeliculaDetalle(this.id!.toString())
    .subscribe( resp => {

      this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id!.toString())
    .subscribe( resp => {

      this.actores = resp.cast;
    });
  }

  async favorito() {
    this.dataLocalService.guardarPelicula( this.pelicula );
    this.existe =  !this.existe;
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  ngAfterViewInit() {
    // Asignar opciones al elemento una vez que esté montado
    Object.assign(this.swiperEl.nativeElement, this.slideOptActores);
    this.swiperEl.nativeElement.initialize(); // necesario para aplicar opciones
  }

}
