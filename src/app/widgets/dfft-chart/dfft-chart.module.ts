import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DfftChartComponent} from './dfft-chart.component';


@NgModule({
    declarations: [
        DfftChartComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DfftChartComponent
    ]
})
export class DfftChartModule {
}
