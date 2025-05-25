// src/app/cargar-datos/cargar-datos.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Si vas a usar [(ngModel)] para el input "Escriba datos extras si gusta...", necesitarías FormsModule:
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cargar-datos',
  standalone: true, // <-- Componente Standalone
  imports: [
    CommonModule,
    RouterModule
    // FormsModule // Descomenta si usas ngModel
  ],
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.css']
})
export class CargarDatosComponent {

  // Si usaras ngModel para el input de texto:
  // datosExtras: string = '';

  constructor(private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Lógica para manejar el archivo seleccionado
      console.log('Archivo seleccionado:', file.name);
      // Por ejemplo, podrías leer el archivo aquí o enviarlo a un servicio
    }
  }

  navigateToVisualizacion() {
    // Aquí podrías querer pasar alguna información obtenida de los datos cargados
    // por ejemplo, a través de un servicio o como parámetros de ruta (más complejo)
    this.router.navigate(['/visualizacion-datos']);
  }
}