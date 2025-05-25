// src/app/multi-agentes/multi-agentes.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas comunes si las necesitas en el HTML
import { RouterModule } from '@angular/router'; // Para routerLink (si lo usaras) y consistencia

@Component({
  selector: 'app-multi-agentes',
  standalone: true, // <-- Componente Standalone
  imports: [
    CommonModule,
    RouterModule // Aunque la navegación es programática, es bueno tenerlo por si usas routerLink
  ],
  templateUrl: './multi-agentes.component.html',
  styleUrls: ['./multi-agentes.component.css']
})
export class MultiAgentesComponent {

  constructor(private router: Router) {}

  navigateToCargarDatos() {
    this.router.navigate(['/cargar-datos']);
  }
}