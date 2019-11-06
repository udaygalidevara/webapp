import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfaCardComponent } from './ffa-card.component';

describe('FfaCardComponent', () => {
  let component: FfaCardComponent;
  let fixture: ComponentFixture<FfaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
