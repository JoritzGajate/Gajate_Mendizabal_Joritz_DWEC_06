import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, generate } from "rxjs"

/*Segunda fase de la autorización de spotify.
Se hace una llamada POST para intercambiar el código que hemos recogido en la primera fase por un token de acceso
que dura una hora, este es el token que utilizaremos en todas las llamadas que hagamos en el servicio de Spotify.
*/


@Injectable()
export class AccessTokenService{

    public accessToken="";
    public code = window.sessionStorage.getItem("code");
    public redirectUri = "http://localhost:4200";
    public client_id="2ef8d58480074bb5878ecd4eaee8f526";
    public client_secret="4b8dc60f41b64fcfb2f4642ccd922ed6";

    public url:any;
    public HEADER:any;
 

    constructor( public _http: HttpClient) {
        this.url="https://accounts.spotify.com/api/token?grant_type=authorization_code&code="+ this.code + "&redirect_uri=" + this.redirectUri;
        this.HEADER={headers: new HttpHeaders({'Authorization': 'Basic MmVmOGQ1ODQ4MDA3NGJiNTg3OGVjZDRlYWVlOGY1MjY6NGI4ZGM2MGY0MWI2NGZjZmIyZjQ2NDJjY2Q5MjJlZDY=', 'Content-type': 'application/x-www-form-urlencoded'})};
    }

    lanzarConsulta(): Observable<any>{
        return this._http.post(this.url, this.HEADER);
        /*Este POST da error y no he conseguido recoger el token de acceso.*/
    }

}

