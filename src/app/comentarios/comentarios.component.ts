import { Component } from '@angular/core';
import { Comentario } from '../models/comentario';
import { DatePipe } from '@angular/common';
import { InicioComponent } from '../inicio/inicio.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cancion } from '../models/cancion';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
  providers: [SpotifyService]
})
export class ComentariosComponent {

  public comentario : Comentario;
  public fecha: any;
  public arrayComent: Array<Comentario>;
  public cancionActual: any;
  public haClickado: boolean;

  constructor(private spotify: SpotifyService){

    /*Modifica el formato de la fecha*/
    this.fecha = new Date();
    this.fecha = this.fecha.getFullYear()+'/'+(this.fecha.getMonth()+1)+'/'+this.fecha.getDate();

    this.comentario= new Comentario('', this.fecha,'Lau teilatu',0,'')
  
    this.arrayComent=[];

    this.haClickado= false;
  }

  onSubmit() : void{
    this.cancionActual=this.spotify.getCancionActual();
    //this.comentario.cancion=this.cancionActual.nombre;
    this.haClickado=true;

    //Para que se puedan guardar todos los comentarios hechos (no está implementado).
    //let arrayComent= localStorage.getItem("ArrayComentarios");
    //this.arrayComent.push(this.comentario);
    //localStorage.setItem('ArrayComentarios', JSON.stringify(this.arrayComent));
    console.log(this.arrayComent);
  }

}


