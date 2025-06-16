import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

interface ChatMessage {
  text: string;
  isUser: boolean;
  isThinking?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  private webhookUrl: string = 'http://localhost:5678/webhook-test/220ead7c-cbc0-402a-9021-922973c441b4';

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.messages.push({ text: this.newMessage, isUser: true });

      const userMessage = this.newMessage;
      this.newMessage = '';

      // Add thinking animation message
      const thinkingMessage: ChatMessage = {
        text: '',
        isUser: false,
        isThinking: true
      };
      this.messages.push(thinkingMessage);

      // Scroll to bottom to show thinking animation
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      // Make HTTP call to webhook
      this.http.post(this.webhookUrl, { message: userMessage }, { responseType: 'text' })
        .subscribe({
          next: (response: any) => {
            // Remove thinking message
            this.messages = this.messages.filter(msg => !msg.isThinking);

            // Clean response text
            response = response.replace(/</g, '<').replace(/>/g, '>');

            // Add AI response
            this.messages.push({
              text: response || "No se recibió una respuesta clara de la IA.",
              isUser: false,
              isThinking: false
            });

            // Scroll to bottom to show new message
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);

            console.log(response);
          },
          error: (error) => {
            console.error('Error al llamar al servicio de IA:', error);
            
            // Remove thinking message
            this.messages = this.messages.filter(msg => !msg.isThinking);
            
            this.messages.push({
              text: "Lo siento, hubo un error al conectar con la IA. Por favor, inténtalo de nuevo más tarde.",
              isUser: false,
              isThinking: false
            });

            // Scroll to bottom
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
        });
    }
  }

  private scrollToBottom(): void {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}