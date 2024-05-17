import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Cancion } from '../models/cancion';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css',
  providers: [SpotifyService]
})

/*Usa el servicio de spotify para realizar las llamadas.*/

export class ReproductorComponent {
  
  public cancionActual: any;

  constructor(private spotify: SpotifyService) {
    this.cancionActual = new Cancion('Kalanbreak','Gozategi','')
  }

  ngOnInit(): void {
    this.cancionActual=this.spotify.getCancionActual();
    console.log(this.cancionActual)
  }

  darleAlPlay(){
    this.spotify.reanudarPararCancion();
  }

  cancionAnterior(){
    this.spotify.pasarACancionAnterior();
  }

  siguienteCancion(){
    this.spotify.pasarASiguienteCancion();
  }

}
