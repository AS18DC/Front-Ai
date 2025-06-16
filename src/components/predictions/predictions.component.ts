import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="predictions-container" [@fadeIn]="'in'">
      <div class="predictions-header">
        <h2>AI Predictions</h2>
        <p>Explore future trends and insights powered by AI</p>
      </div>
      
      <div class="predictions-grid">
        <div class="prediction-card" *ngFor="let prediction of predictions; let i = index" 
             [@slideInStagger]="'in'" 
             [style.animation-delay]="i * 100 + 'ms'">
          <div class="card-icon" [style.background]="prediction.color">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path [attr.d]="prediction.icon"></path>
            </svg>
          </div>
          <div class="card-content">
            <h3>{{ prediction.title }}</h3>
            <p>{{ prediction.description }}</p>
            <div class="card-stats">
              <span class="confidence">{{ prediction.confidence }}% confidence</span>
              <span class="timeframe">{{ prediction.timeframe }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">🔮</div>
        <h3>More Predictions Coming Soon</h3>
        <p>We're working on advanced AI models to provide even more accurate predictions</p>
      </div>
    </div>
  `,
  styleUrls: ['./predictions.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PredictionsComponent {
  predictions = [
    {
      title: 'Market Trends',
      description: 'AI predicts significant growth in renewable energy sector over the next quarter',
      confidence: 87,
      timeframe: 'Next 3 months',
      color: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      icon: 'M3 3v18h18M9 17V9l4 4 4-4v8'
    },
    {
      title: 'Technology Adoption',
      description: 'Widespread adoption of AI assistants expected in enterprise environments',
      confidence: 92,
      timeframe: 'Next 6 months',
      color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
    },
    {
      title: 'Climate Patterns',
      description: 'Weather models suggest increased precipitation in northern regions',
      confidence: 78,
      timeframe: 'Next season',
      color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      icon: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'
    },
    {
      title: 'Consumer Behavior',
      description: 'Shift towards sustainable products predicted to accelerate significantly',
      confidence: 84,
      timeframe: 'Next year',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'
    }
  ];
}