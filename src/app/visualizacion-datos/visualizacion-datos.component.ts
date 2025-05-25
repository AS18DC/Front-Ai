// src/app/visualizacion-datos/visualizacion-datos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor, *ngIf, etc.
import { RouterModule } from '@angular/router'; // Por si añades enlaces o botones de navegación

// Si decides usar una librería de gráficos como Chart.js y esta ofrece un componente standalone o un módulo
// import { NgChartsModule } from 'ng2-charts'; // Ejemplo para ng2-charts (Chart.js wrapper)

@Component({
  selector: 'app-visualizacion-datos',
  standalone: true, // <-- Componente Standalone
  imports: [
    CommonModule, // Esencial si usas *ngFor para priceData en el HTML
    RouterModule
    // NgChartsModule // Ejemplo si usas una librería de gráficos
  ],
  templateUrl: './visualizacion-datos.component.html',
  styleUrls: ['./visualizacion-datos.component.css']
})
export class VisualizacionDatosComponent implements OnInit {

  // Datos de ejemplo para la comparación de precios.
  // En una aplicación real, estos datos vendrían de un servicio o como entrada al componente.
  priceData = [
    { name: 'Harina Blancaflor Leudante 1kg', actual: '400.000$', prediction: '450.000$', actualWidth: '80%', predictionWidth: '90%', productNameRepeated: 'Harina Blancaflor Leudante 1kg' },
    { name: 'Fideos Matarazzo Mostacholes Rayados 500g', actual: '370.000$', prediction: '300.000$', actualWidth: '70%', predictionWidth: '60%', productNameRepeated: 'Fideos Matarazzo Mostacholes Rayados 500g' },
    { name: 'Aceite Cocinero Girasol Botella PET 900ml', actual: '320.000$', prediction: '280.000$', actualWidth: '60%', predictionWidth: '55%', productNameRepeated: 'Aceite Cocinero Girasol Botella PET 900ml' }
  ];

  // Datos de ejemplo para la lista de productos (sección de búsqueda)
  productList = [
    { name: 'Melon', icon: 'assets/melon-icon.png' }, // Asegúrate que los paths a los iconos sean correctos
    { name: 'Producto A', icon: 'assets/producto-icon.png' },
    { name: 'Producto B', icon: 'assets/producto-icon.png' }
  ];

  // Datos de ejemplo para el gráfico (si se implementara dinámicamente)
  // graphData: any; // Aquí irían los datos para Chart.js u otra librería

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar datos desde un servicio si fuera necesario
    // this.loadGraphData(); // Ejemplo
    // this.createChart(); // Si usas una librería de gráficos
  }

  buscarProducto(termino: string) {
    console.log('Buscando producto:', termino);
    // Lógica para filtrar this.productList o llamar a un servicio
  }

  verDetalles(producto: any) {
    console.log('Viendo detalles de:', producto.name);
    // Lógica para mostrar detalles, quizás navegar a otra vista o mostrar un modal
  }

  exportarDatos() {
    console.log('Exportando datos...');
    // Lógica para exportar los datos (ej. a CSV, PDF)
  }

  generarReporte() {
    console.log('Generando reporte...');
    // Lógica para generar un reporte
  }
  // Example for Chart.js - you'll need to install and configure it
  /*
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar', // or 'line', etc.
        data: {
          labels: ['1', '2', '3', '4'], // Example labels
          datasets: [{
            label: 'Ventas mayo pasado',
            data: [65, 59, 80, 81], // Example data
            backgroundColor: 'rgba(255, 242, 204, 0.7)', // Light yellow
            borderColor: 'rgba(230, 207, 138, 1)',
            borderWidth: 1
          },
          {
            label: 'Ventas mayo nspro esperables',
            data: [45, 70, 35, 73], // Example data
            backgroundColor: 'rgba(214, 214, 255, 0.7)', // Light purple
            borderColor: 'rgba(176, 176, 224, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 90 // Adjust based on your data (90k)
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
  */
}