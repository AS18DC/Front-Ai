import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAgentesComponent } from './multi-agentes.component';

describe('MultiAgentesComponent', () => {
  let component: MultiAgentesComponent;
  let fixture: ComponentFixture<MultiAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiAgentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
