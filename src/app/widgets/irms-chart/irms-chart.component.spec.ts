import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IrmsChartComponent} from './irms-chart.component';


describe('IrmsChartComponent', () => {
    let component: IrmsChartComponent;
    let fixture: ComponentFixture<IrmsChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IrmsChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IrmsChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
