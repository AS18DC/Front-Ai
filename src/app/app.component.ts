// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule para <router-outlet>

@Component({
  selector: 'app-root',
  standalone: true, // <-- MARCA COMO STANDALONE
  imports: [RouterModule], // <-- Importa RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tu-proyecto';
}