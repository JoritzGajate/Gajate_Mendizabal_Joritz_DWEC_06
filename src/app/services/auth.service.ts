import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, generate } from "rxjs"

/*Primera fase de la autorización de spotify.
Se hace una llamada utilizando el client_id que se nos ha dado al crear una app de spotify, la página de redireccionamiento
y los permisos que pedimos para realizar distintas llamadas. Aquí tendremos que loguearnos en nuestra cuenta de spotify y autorizar estos permisos.
*/

@Injectable()
export class AuthService{
    public code : any;
    public authEndpoint = "http://accounts.spotify.com/authorize?";
    public clientID = "2ef8d58480074bb5878ecd4eaee8f526";
    public redirectUri = "http://localhost:4200";
    public scopes = ["user-library-read", "playlist-read-private"];

    public autorizacion = this.authEndpoint + "client_id="+ this.clientID + "&response_type=code&redirect_uri=" + this.redirectUri + "&scope=user-library-read%20playlist-read-private%20user-read-currently-playing%20user-read-private%20user-read-email%20user-modify-playback-state";

    constructor( private _http: HttpClient) {

        /*Redirecciona a la página de spotify donde damos la autorización.
        También se puede hacer mediante una llamada GET aunque en mi caso salta un error CORS.*/
        window.location.href = this.autorizacion;

        /*Recogemos el código que se nos da y lo guardamos en el sessionStorage*/ 
        this.code = new URLSearchParams(window.location.search).get('code');
        window.sessionStorage.setItem("code", this.code);
    }
}