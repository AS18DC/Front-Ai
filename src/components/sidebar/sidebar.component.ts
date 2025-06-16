import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar" [@slideIn]="'in'">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">AI</div>
          <span class="logo-text">Assistant</span>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          class="nav-item" 
          [class.active]="activeTab === 'chat'"
          (click)="selectTab('chat')"
          [@buttonHover]="activeTab === 'chat' ? 'active' : 'inactive'"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="nav-text">Chat</span>
        </button>
        
        <button 
          class="nav-item" 
          [class.active]="activeTab === 'predictions'"
          (click)="selectTab('predictions')"
          [@buttonHover]="activeTab === 'predictions' ? 'active' : 'inactive'"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8z"></path>
            <path d="M9 9a3 3 0 1 1 6 0c0 2-3 5-6 5"></path>
          </svg>
          <span class="nav-text">Predictions</span>
        </button>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">U</div>
          <div class="user-info">
            <div class="user-name">User</div>
            <div class="user-status">Online</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('buttonHover', [
      state('active', style({ transform: 'scale(1.02)' })),
      state('inactive', style({ transform: 'scale(1)' })),
      transition('inactive => active', [
        animate('150ms ease-out')
      ]),
      transition('active => inactive', [
        animate('150ms ease-in')
      ])
    ])
  ]
})
export class SidebarComponent {
  @Output() tabChanged = new EventEmitter<string>();
  
  activeTab = 'chat';

  selectTab(tab: string): void {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }
}