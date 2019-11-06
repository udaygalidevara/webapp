import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreqChartComponent} from './freq-chart.component';


@NgModule({
    declarations: [
        FreqChartComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FreqChartComponent
    ]
})
export class FreqChartModule {
}
