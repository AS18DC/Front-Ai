import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Array<{ text: string; isUser: boolean }> = [];
  newMessage: string = '';
  private webhookUrl: string = 'http://localhost:5678/webhook-test/220ead7c-cbc0-402a-9021-922973c441b4';

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Añade el mensaje del usuario
      this.messages.push({ text: this.newMessage, isUser: true });

      const userMessage = this.newMessage;
      this.newMessage = '';

      // Muestra un mensaje de "pensando"
      this.messages.push({
        text: "Estoy analizando los datos, dame un momento...",
        isUser: false
      });

      // Haz la llamada HTTP POST
      this.http.post(this.webhookUrl, { message: userMessage }, { responseType: 'text' })
        .subscribe({
          next: (response: any) => {
            // Elimina el mensaje de "pensando"
            this.messages = this.messages.filter(msg => msg.text !== "Estoy analizando los datos, dame un momento...");

            response = response.replace(/</g, '<').replace(/>/g, '>');

            this.messages.push({
              text: response || "No se recibió una respuesta clara de la IA.",
              isUser: false
            });
          },
          error: (error) => {
            console.error('Error al llamar al servicio de IA:', error);
            this.messages = this.messages.filter(msg => msg.text !== "Estoy analizando los datos, dame un momento...");
            
            this.messages.push({
              text: "Lo siento, hubo un error al conectar con la IA. Por favor, inténtalo de nuevo más tarde.",
              isUser: false
            });
          }
        });
    }
  }

  sendSuggestion(suggestion: string) {
    this.newMessage = suggestion;
    this.sendMessage();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}