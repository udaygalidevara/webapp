import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {A11yModule} from '@angular/cdk/a11y';
import {SelectMachineComponent} from './select-machine/select-machine.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DfftCardComponent} from './dfft-card/dfft-card.component';
import {DfftChartModule} from '../../widgets/dfft-chart/dfft-chart.module';

import {FfaCardComponent} from './ffa-card/ffa-card.component';
import {IrmsChartModule} from '../../widgets/irms-chart/irms-chart.module';
import {IrmsCardComponent} from './irms-card/irms-card.component';
import {FreqChartModule} from '../../widgets/freq-chart/freq-chart.module';
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {TaggingComponent} from './tagging/tagging.component';


const CUSTOM_FORMAT = {
    fullPickerInput: 'DD-MM-YYYY HH:mm:ss',
    parseInput: 'YYYY-MM-DD HH:mm:ss',
    datePickerInput: 'YYYY-MM-DD HH:mm:ss',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
};


@NgModule({
    declarations: [
        DashboardComponent,
        SelectMachineComponent,
        DfftCardComponent,
        FfaCardComponent,
        IrmsCardComponent,
        TaggingComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,

        /* Widgets */
        DfftChartModule,
        FreqChartModule,
        IrmsChartModule,

        /* Material modules */
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        A11yModule,

        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
    ],
    providers: [
        {provide: OWL_DATE_TIME_FORMATS, useValue: CUSTOM_FORMAT},
    ]
})
export class DashboardModule {
}
