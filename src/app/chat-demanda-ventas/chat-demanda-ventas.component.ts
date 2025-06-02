import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders
@Component({
  selector: 'app-chat-demanda-ventas',
  imports:  [CommonModule, FormsModule],
  templateUrl: './chat-demanda-ventas.component.html',
  styleUrl: './chat-demanda-ventas.component.css'
})
export class ChatDemandaVentasComponent {
  messages: Array<{ text: string; isUser: boolean }> = [];
  newMessage: string = '';
  // Reemplaza con la URL real de tu webhook de IA
  private webhookUrl: string = 'https://tu-servicio-ia.com/webhook'; 

  constructor(private http: HttpClient) { } // Inyecta HttpClient
  sendMessage() {
    if (this.newMessage.trim()) {
      // Añade el mensaje del usuario
      this.messages.push({ text: this.newMessage, isUser: true });

      const userMessage = this.newMessage; // Guarda el mensaje para enviarlo
      this.newMessage = ''; // Limpia el input inmediatamente

      // Prepara los headers para la solicitud JSON
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      // Muestra un mensaje de "pensando" mientras esperas la respuesta de la IA
      this.messages.push({
        text: "Estoy analizando los datos, dame un momento...",
        isUser: false
      });

      // Haz la llamada HTTP POST a tu webhook
      this.http.post(this.webhookUrl, { message: userMessage }, { headers })
        .subscribe({
          next: (response: any) => {
            // Elimina el mensaje de "pensando" si quieres
            this.messages = this.messages.filter(msg => msg.text !== "Estoy analizando los datos, dame un momento...");
            
            // Asume que la respuesta tiene una propiedad 'reply' o 'text'
            this.messages.push({
              text: response.reply || response.text || "No se recibió una respuesta clara de la IA.",
              isUser: false
            });
          },
          error: (error) => {
            console.error('Error al llamar al servicio de IA:', error);
            // Elimina el mensaje de "pensando" si quieres
            this.messages = this.messages.filter(msg => msg.text !== "Estoy analizando los datos, dame un momento...");
            
            this.messages.push({
              text: "Lo siento, hubo un error al conectar con la IA. Por favor, inténtalo de nuevo más tarde.",
              isUser: false
            });
          }
        });
    }
  }
}