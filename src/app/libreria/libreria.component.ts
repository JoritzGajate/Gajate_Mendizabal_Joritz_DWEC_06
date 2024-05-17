import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrl: './libreria.component.css',
  providers: [SpotifyService]
})

/*Usa el servicio de spotify para realizar las llamadas.*/

export class LibreriaComponent implements OnInit{

  public playlistsUsuario:any;

  constructor(private spotify: SpotifyService) {
    this.playlistsUsuario= [new Array<Playlist>];
  }

  ngOnInit(): void {
    this.playlistsUsuario=this.spotify.getPlaylists();
    console.log(this.spotify.playlistsUsuario);
  }
}
