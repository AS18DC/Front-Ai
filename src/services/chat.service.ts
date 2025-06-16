import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(),
      isUser: false
    }
  ]);

  private typingSubject = new BehaviorSubject<boolean>(false);

  messages$ = this.messagesSubject.asObservable();
  isTyping$ = this.typingSubject.asObservable();

  private botResponses = [
    "That's a great question! Let me think about that.",
    "I understand your point. Here's what I think...",
    "Interesting! I'd be happy to help with that.",
    "Thanks for sharing that with me. Here's my response:",
    "That's a complex topic. Let me break it down for you.",
    "I appreciate you asking. Here's what I know about that:",
    "Great question! I've been thinking about this too.",
    "That's exactly the kind of thing I love to discuss!"
  ];

  sendMessage(text: string): void {
    const userMessage: Message = {
      id: this.generateId(),
      text,
      timestamp: new Date(),
      isUser: true
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMessage]);

    // Simulate bot typing
    this.simulateBotResponse();
  }

  clearMessages(): void {
    this.messagesSubject.next([
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        timestamp: new Date(),
        isUser: false
      }
    ]);
  }

  private simulateBotResponse(): void {
    this.typingSubject.next(true);

    const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds
    const randomResponse = this.botResponses[Math.floor(Math.random() * this.botResponses.length)];

    setTimeout(() => {
      this.typingSubject.next(false);
      
      const botMessage: Message = {
        id: this.generateId(),
        text: randomResponse,
        timestamp: new Date(),
        isUser: false
      };

      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, botMessage]);
    }, randomDelay);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}