import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.interface';
import { MessageComponent } from '../message/message.component';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent, TypingIndicatorComponent, OptionsMenuComponent],
  template: `
    <div class="chat-container" [@fadeIn]="'in'">
      <div class="chat-header">
        <div class="header-content">
          <div class="avatar">
            <div class="avatar-circle">AI</div>
          </div>
          <div class="header-info">
            <h3 class="chat-title" (click)="toggleOptionsMenu()" [@titleHover]="isOptionsMenuOpen ? 'active' : 'inactive'">
              LLama3 Latest
              <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </h3>
            <p class="chat-status">Online</p>
          </div>
          <div class="options-menu-container">
            <app-options-menu 
              [isOpen]="isOptionsMenuOpen"
              (optionSelected)="handleOptionSelected($event)"
              (menuClosed)="closeOptionsMenu()"
            ></app-options-menu>
          </div>
        </div>
      </div>

      <div class="chat-messages" #messagesContainer>
        <div class="messages-content">
          <app-message 
            *ngFor="let message of messages; trackBy: trackByMessageId" 
            [message]="message"
          ></app-message>
          
          <app-typing-indicator *ngIf="isTyping"></app-typing-indicator>
        </div>
      </div>

      <div class="chat-input-container">
        <div class="input-wrapper">
          <input
            #messageInput
            type="text"
            [(ngModel)]="newMessage"
            (keydown.enter)="sendMessage()"
            (input)="onInputChange()"
            placeholder="Send a Message"
            class="message-input"
            [disabled]="isTyping"
          />
          <button 
            (click)="sendMessage()" 
            class="send-button"
            [disabled]="!newMessage.trim() || isTyping"
            [@buttonPulse]="canSend ? 'active' : 'inactive'"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('buttonPulse', [
      state('active', style({ transform: 'scale(1)' })),
      state('inactive', style({ transform: 'scale(1)' })),
      transition('inactive => active', [
        animate('150ms ease-out', style({ transform: 'scale(1.05)' })),
        animate('150ms ease-in', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('titleHover', [
      state('active', style({ color: '#667eea' })),
      state('inactive', style({ color: '#ffffff' })),
      transition('inactive => active', [
        animate('200ms ease-out')
      ]),
      transition('active => inactive', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: Message[] = [];
  newMessage = '';
  isTyping = false;
  canSend = false;
  isOptionsMenuOpen = false;

  private destroy$ = new Subject<void>();
  private shouldScrollToBottom = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.shouldScrollToBottom = true;
      });

    this.chatService.isTyping$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isTyping => {
        this.isTyping = isTyping;
        if (isTyping) {
          this.shouldScrollToBottom = true;
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendMessage(): void {
    const message = this.newMessage.trim();
    if (message && !this.isTyping) {
      this.chatService.sendMessage(message);
      this.newMessage = '';
      this.canSend = false;
      this.messageInput.nativeElement.focus();
    }
  }

  onInputChange(): void {
    this.canSend = this.newMessage.trim().length > 0;
  }

  toggleOptionsMenu(): void {
    this.isOptionsMenuOpen = !this.isOptionsMenuOpen;
  }

  closeOptionsMenu(): void {
    this.isOptionsMenuOpen = false;
  }

  handleOptionSelected(option: string): void {
    console.log('Option selected:', option);
    // Handle different options here
    switch (option) {
      case 'rename':
        // Implement rename functionality
        break;
      case 'export':
        // Implement export functionality
        break;
      case 'settings':
        // Implement settings functionality
        break;
      case 'clear':
        this.chatService.clearMessages();
        break;
      case 'delete':
        // Implement delete functionality
        break;
    }
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}