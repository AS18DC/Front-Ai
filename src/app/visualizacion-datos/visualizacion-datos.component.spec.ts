import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionDatosComponent } from './visualizacion-datos.component';

describe('VisualizacionDatosComponent', () => {
  let component: VisualizacionDatosComponent;
  let fixture: ComponentFixture<VisualizacionDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacionDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
