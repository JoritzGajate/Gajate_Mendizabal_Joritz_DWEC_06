import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Comentario } from '../models/comentario';
import { AccessTokenService } from '../services/acces_token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [AuthService, AccessTokenService]
})
export class InicioComponent implements OnInit {
  /*public arrayComentarios: Array<Comentario>;*/
  public accessToken="";

  /*Primera fase de la autorización de spotify mediante el constructor de 'auth'*/
  constructor(private auth: AuthService, private _accessToken: AccessTokenService) {

    /*El array que guarda los comentarios no está implementado en el código.
    this.arrayComentarios=[];
    localStorage.setItem('ArrayComentarios', JSON.stringify(this.arrayComentarios));*/
    }
  
    ngOnInit(): void{

      /*Segunda fase de la autorización de spotify: intercambiar el code por el token de acceso.*/ 
      this._accessToken.lanzarConsulta().subscribe( 
        result =>(
          /*Aquí se tendría que guardar el token recogido en el sessionStorage*/
          console.log(result),
          window.sessionStorage.setItem("token", this.accessToken)
        ),
        error =>(
          console.log(<any>error)
        )
      )
    }
}
