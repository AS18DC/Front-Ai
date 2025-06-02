import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDemandaVentasComponent } from './chat-demanda-ventas.component';

describe('ChatDemandaVentasComponent', () => {
  let component: ChatDemandaVentasComponent;
  let fixture: ComponentFixture<ChatDemandaVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDemandaVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDemandaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
