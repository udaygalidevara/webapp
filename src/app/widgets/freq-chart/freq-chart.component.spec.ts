import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FreqChartComponent} from './freq-chart.component';


describe('FreqChartComponent', () => {
    let component: FreqChartComponent;
    let fixture: ComponentFixture<FreqChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FreqChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FreqChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
