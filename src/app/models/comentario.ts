export class Comentario{
    constructor(
        public nombre: string,
        public fecha: Date,
        public cancion: string,
        public valoracion: number,
        public mensaje: string
    ){}
}