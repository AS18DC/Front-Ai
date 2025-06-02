import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Array<{ text: string; isUser: boolean }> = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.messages.push({ text: this.newMessage, isUser: true });
      
      // Simulate AI response (in a real app, this would call your AI service)
      setTimeout(() => {
        this.messages.push({ 
          text: "I'm analyzing the data and preparing insights for you. How can I help you further?",
          isUser: false 
        });
      }, 1000);
      
      this.newMessage = '';
    }
  }
}