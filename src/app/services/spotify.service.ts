import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Cancion } from "../models/cancion";
import { Playlist } from "../models/playlist";

/*Servicio de Spotify.
Utiliza el token de acceso para realizar todas las llamadas al api,
los componentes acceden a los métodos de este servicio para realizar las 
llamadas y recoger los resultados.
*/


@Injectable()
export class SpotifyService{

    public cancionActual= new Cancion('Jo ta ke', 'Su ta gar','');
    public playlistsUsuario = new Array<Playlist>;
    public respuesta:any;
    public accessToken = "";
    
   
    constructor( private _http: HttpClient) {
        this.actualizarToken();
    }

    actualizarToken(){
        this.accessToken = sessionStorage.getItem('token') || '';
        console.log(this.accessToken);
    }


    /*Los cuatro métodos básicos para las llamadas GET, POST, PUT y DELETE a los que se puede llamar para
    hacer una consulta más específica.*/

    getConsulta(consulta: string){
        const URL = 'https://api.spotify.com/v1/' + consulta ;
        const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken})}

        return this._http.get(URL, HEADER);
    }


    postConsulta(consulta: string){
        const URL = 'https://api.spotify.com/v1/' + consulta ;
        const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken})}

        return this._http.post(URL, HEADER);
    }


    putConsulta(consulta: string){
        const URL = 'https://api.spotify.com/v1/' + consulta ;
        const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken})}

        return this._http.put(URL, HEADER);
    }


    deleteConsulta(consulta: string){
        const URL = 'https://api.spotify.com/v1/' + consulta ;
        const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken})}

        return this._http.delete(URL, HEADER);
    }


    /*Métodos específicos a los que se llama desde los componentes.*/


    /*Recoge la canción actual*/
    getCancionActual(){
        this.getConsulta("me/player/currently-playing").subscribe({
            next: data =>{
                console.log("Read", data);
                this.respuesta=data;
                this.cancionActual.nombre= this.respuesta.item.name;
                this.cancionActual.artista= this.respuesta.item.artists.name;
                this.cancionActual.fotoAlbum=this.respuesta.item.album.images;    
                return this.cancionActual;
            },
            error: error =>{
                console.log("Read error", error);
                return this.cancionActual;
            }
        });
    }

    /*Reanuda o para la canción depende de su estado.*/
    reanudarPararCancion(){
        this.putConsulta("me/player/play").subscribe({
            next: data =>{
              console.log("Update", data);
            },
            error: error =>{
              console.log("Update error", error);
            }
          });
    }
    
    /*Pasa a la siguiente canción*/
    pasarASiguienteCancion(){
        this.postConsulta("me/player/next").subscribe({
            next: data =>{
              console.log("Create", data);
            },
            error: error =>{
              console.log("Create error", error);
            }
          });
    }

    /*Vuelve a la canción anterior*/
    pasarACancionAnterior(){
        this.postConsulta("me/player/previous").subscribe({
            next: data =>{
              console.log("Create", data);
            },
            error: error =>{
              console.log("Create error", error);
            }
          });
    }

    /*Recoge todas las playlists creadas por el usuario logueado*/
    getPlaylists(){
        this.getConsulta("me/playlists").subscribe({
            next: data =>{
                console.log("Read", data);
                this.respuesta=data;
                for (let i=0; i< this.respuesta.items.length; i++){
                    this.playlistsUsuario[i].id=this.respuesta.items[i]["id"];
                    this.playlistsUsuario[i].nombre=this.respuesta.items[i]["name"];
                    this.playlistsUsuario[i].foto=this.respuesta.items[i]["images"];
                }
                return this.playlistsUsuario;
            },
            error: error =>{
                console.log("Read error", error);
            }
        });
    }

    /*Recoge todas las canciones de una playlist teniendo su id*/
    /*No está implementado en el código*/
    getCancionesDePlaylist(playlistId: string){
        this.getConsulta("me/playlists/" + playlistId + "/tracks").subscribe({
            next: data =>{
                console.log("Read", data);
                this.respuesta=data;
            },
            error: error =>{
                console.log("Read error", error);
            }
        });
    }

}