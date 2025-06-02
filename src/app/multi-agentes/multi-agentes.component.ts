import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-multi-agentes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './multi-agentes.component.html',
  styleUrls: ['./multi-agentes.component.css']
})
export class MultiAgentesComponent {
  constructor(private router: Router) {}

  navigateToCargarDatos() {
    this.router.navigate(['/cargar-datos']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }
}