import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DfftCardComponent} from './dfft-card.component';


describe('DfftCardComponent', () => {
    let component: DfftCardComponent;
    let fixture: ComponentFixture<DfftCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DfftCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DfftCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
