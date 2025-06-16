import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-options-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="options-menu" *ngIf="isOpen" [@slideDown]="'in'" (click)="$event.stopPropagation()">
      <div class="menu-header">
        <h4>Chat Options</h4>
      </div>
      
      <div class="menu-items">
        <button class="menu-item" (click)="selectOption('rename')">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>Rename Chat</span>
        </button>
        
        <button class="menu-item" (click)="selectOption('export')">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Export Chat</span>
        </button>
        
        <button class="menu-item" (click)="selectOption('settings')">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 0 1-8 0 4 4 0 0 1 8 0zM7 21a4 4 0 0 1-8 0 4 4 0 0 1 8 0z"></path>
          </svg>
          <span>Chat Settings</span>
        </button>
        
        <div class="menu-divider"></div>
        
        <button class="menu-item danger" (click)="selectOption('clear')">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>Clear Chat</span>
        </button>
        
        <button class="menu-item danger" (click)="selectOption('delete')">
          <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          <span>Delete Chat</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./options-menu.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0, scale: 0.95 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1, scale: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateY(-10px)', opacity: 0, scale: 0.95 }))
      ])
    ])
  ]
})
export class OptionsMenuComponent {
  @Input() isOpen = false;
  @Output() optionSelected = new EventEmitter<string>();
  @Output() menuClosed = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuClosed.emit();
    }
  }

  selectOption(option: string): void {
    this.optionSelected.emit(option);
    this.menuClosed.emit();
  }
}