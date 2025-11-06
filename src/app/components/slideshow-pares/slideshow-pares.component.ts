import { Component, OnInit,Input,  ViewChild, ElementRef, AfterViewInit, Output, EventEmitter  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: false
})


export class SlideshowParesComponent  implements OnInit {
  @ViewChild('swiperEl', { static: false }) swiperEl!: ElementRef;
  @Input() peliculas: any[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
      slidesPerView: 3.3,
      freeMode: true,
      spaceBetween: -10
    }


  constructor(private modalCtrl: ModalController ) { }

  ngOnInit() {}
  ngAfterViewInit() {
    // Asignar opciones al elemento una vez que esté montado
    Object.assign(this.swiperEl.nativeElement, this.slideOpts);
    this.swiperEl.nativeElement.initialize(); // necesario para aplicar opciones
  }

  onClick(){

    this.cargarMas.emit();

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
