import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrmsCardComponent } from './irms-card.component';

describe('IrmsCardComponent', () => {
  let component: IrmsCardComponent;
  let fixture: ComponentFixture<IrmsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrmsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrmsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
