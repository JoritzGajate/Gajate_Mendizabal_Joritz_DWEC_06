import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

import { LibreriaComponent } from "./libreria/libreria.component";
import { ReproductorComponent } from "./reproductor/reproductor.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ComentariosComponent } from "./comentarios/comentarios.component";

const appRoutes : Routes = [
    {path: 'libreria', component: LibreriaComponent},
    {path: 'reproductor', component: ReproductorComponent},
    {path: 'comentarios', component: ComentariosComponent},
    {path: '', component: InicioComponent},
    {path: '**', component: InicioComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);

