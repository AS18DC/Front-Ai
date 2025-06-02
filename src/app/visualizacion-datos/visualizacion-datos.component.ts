import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-visualizacion-datos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './visualizacion-datos.component.html',
  styleUrls: ['./visualizacion-datos.component.css']
})
export class VisualizacionDatosComponent implements OnInit {
  priceData = [
    { name: 'Harina Blancaflor Leudante 1kg', actual: '400.000$', prediction: '450.000$', actualWidth: '80%', predictionWidth: '90%', productNameRepeated: 'Harina Blancaflor Leudante 1kg' },
    { name: 'Fideos Matarazzo Mostacholes Rayados 500g', actual: '370.000$', prediction: '300.000$', actualWidth: '70%', predictionWidth: '60%', productNameRepeated: 'Fideos Matarazzo Mostacholes Rayados 500g' },
    { name: 'Aceite Cocinero Girasol Botella PET 900ml', actual: '320.000$', prediction: '280.000$', actualWidth: '60%', predictionWidth: '55%', productNameRepeated: 'Aceite Cocinero Girasol Botella PET 900ml' }
  ];

  productList = [
    { name: 'Melon', icon: 'assets/melon-icon.png' },
    { name: 'Producto A', icon: 'assets/producto-icon.png' },
    { name: 'Producto B', icon: 'assets/producto-icon.png' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buscarProducto(termino: string) {
    console.log('Buscando producto:', termino);
  }

  verDetalles(producto: any) {
    console.log('Viendo detalles de:', producto.name);
  }

  exportarDatos() {
    console.log('Exportando datos...');
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }
}