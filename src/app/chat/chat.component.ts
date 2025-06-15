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
  newMessage: string = '';
  private webhookUrl: string = 'http://localhost:5678/webhook-test/220ead7c-cbc0-402a-9021-922973c441b4';

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.newMessage.trim()) {
      console.log('Enviando mensaje:', this.newMessage);
      
      // Aquí puedes agregar la lógica para enviar el mensaje
      // Por ahora solo limpiamos el input
      this.newMessage = '';
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