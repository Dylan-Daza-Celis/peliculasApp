import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
  standalone: false
})
export class SlideshowPosterComponent  implements OnInit {

@ViewChild('swiperEl', { static: false }) swiperEl!: ElementRef;


  @Input() peliculas: any[] = [];

  slideOpts = {
      slidesPerView: 3.3,
      freeMode: true,

    }

  constructor( private modalCtrl: ModalController
   ) { }



  ngOnInit() {}



  ngAfterViewInit() {
    // Asignar opciones al elemento una vez que esté montado
    Object.assign(this.swiperEl.nativeElement, this.slideOpts);
    this.swiperEl.nativeElement.initialize(); // necesario para aplicar opciones
  }

  async verDetalle(id: String) {
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });

      modal.present();
    }
}
