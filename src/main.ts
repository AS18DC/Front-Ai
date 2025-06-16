import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatComponent } from './components/chat/chat.component';
import { PredictionsComponent } from './components/predictions/predictions.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-sidebar (tabChanged)="onTabChanged($event)"></app-sidebar>
      <div class="main-content">
        <app-chat *ngIf="activeTab === 'chat'"></app-chat>
        <app-predictions *ngIf="activeTab === 'predictions'"></app-predictions>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background: #1a1a1a;
    }
    
    .main-content {
      flex: 1;
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, SidebarComponent, ChatComponent, PredictionsComponent]
})
export class App {
  activeTab = 'chat';

  onTabChanged(tab: string): void {
    this.activeTab = tab;
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
});