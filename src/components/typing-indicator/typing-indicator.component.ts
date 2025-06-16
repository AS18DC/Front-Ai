import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="typing-container" [@slideIn]="'in'">
      <div class="typing-bubble">
        <div class="typing-dots">
          <span class="dot" [@bounce]="'bounce1'"></span>
          <span class="dot" [@bounce]="'bounce2'"></span>
          <span class="dot" [@bounce]="'bounce3'"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./typing-indicator.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
      ])
    ]),
    trigger('bounce', [
      state('bounce1', style({ transform: 'translateY(0)' })),
      state('bounce2', style({ transform: 'translateY(0)' })),
      state('bounce3', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate('0.6s ease-in-out', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-6px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class TypingIndicatorComponent {
  constructor() {
    // Cycle animations continuously
    setInterval(() => {
      // Animation states will cycle automatically
    }, 600);
  }
}