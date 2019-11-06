import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DfftChartComponent} from './dfft-chart.component';


describe('DfftChartComponent', () => {
    let component: DfftChartComponent;
    let fixture: ComponentFixture<DfftChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DfftChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DfftChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
