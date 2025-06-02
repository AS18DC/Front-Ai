import { Routes } from '@angular/router';
import { MultiAgentesComponent } from './multi-agentes/multi-agentes.component';
import { CargarDatosComponent } from './cargar-datos/cargar-datos.component';
import { VisualizacionDatosComponent } from './visualizacion-datos/visualizacion-datos.component';
import { ChatComponent } from './chat/chat.component';
import { ChatDemandaVentasComponent } from './chat-demanda-ventas/chat-demanda-ventas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'multi-agentes', pathMatch: 'full' },
  { path: 'multi-agentes', component: MultiAgentesComponent },
  { path: 'cargar-datos', component: CargarDatosComponent },
  { path: 'visualizacion-datos', component: VisualizacionDatosComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat-ventas', component: ChatDemandaVentasComponent }
];