import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule], // HttpClientModule no se importa aquí si es standalone, se importa en app.config.ts o similar
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Array<{ text: string; isUser: boolean }> = [];
  newMessage: string = '';
  // Reemplaza con la URL real de tu webhook de IA
  private webhookUrl: string = 'http://localhost:5678/webhook-test/220ead7c-cbc0-402a-9021-922973c441b4'; 

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  sendMessage() {
    if (this.newMessage.trim()) {
      // Añade el mensaje del usuario
      this.messages.push({ text: this.newMessage, isUser: true });

      const userMessage = this.newMessage; // Guarda el mensaje para enviarlo
      this.newMessage = ''; // Limpia el input inmediatamente

      // Prepara los headers para la solicitud JSON

      // Muestra un mensaje de "pensando" mientras esperas la respuesta de la IA
      this.messages.push({
        text: "Estoy analizando los datos, dame un momento...",
        isUser: false
      });

      // Haz la llamada HTTP POST a tu webhook
      this.http.post(this.webhookUrl, { message: userMessage }, { responseType: 'text' })
        .subscribe({
          next: (response: any) => {
            // Elimina el mensaje de "pensando" si quieres
            this.messages = this.messages.filter(msg => msg.text !== "Estoy analizando los datos, dame un momento...");

            response = response.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Asume que la respuesta tiene una propiedad 'reply' o 'text'
            this.messages.push({
              text: response || response.body || response.response.body || "No se recibió una respuesta clara de la IA.",
              isUser: false
            });
            console.log(response)
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