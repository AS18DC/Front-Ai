// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MultiAgentesComponent } from './multi-agentes/multi-agentes.component';
import { CargarDatosComponent } from './cargar-datos/cargar-datos.component';
import { VisualizacionDatosComponent } from './visualizacion-datos/visualizacion-datos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'multi-agentes', pathMatch: 'full' }, // Default route
  { path: 'multi-agentes', component: MultiAgentesComponent },
  { path: 'cargar-datos', component: CargarDatosComponent },
  { path: 'visualizacion-datos', component: VisualizacionDatosComponent }
  // Agrega otras rutas aquí si es necesario
];