import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {AvgFrequency, DataConfig, DataPoint} from '../../../interfaces';
import {map, take, tap} from 'rxjs/operators';


@Component({
    selector: 'app-ffa-card',
    templateUrl: './ffa-card.component.html',
    styleUrls: ['./ffa-card.component.scss']
})
export class FfaCardComponent implements OnInit {

    @Input() config: DataConfig;

    public normalData: DataPoint[];
    public abnormalData: DataPoint[];

    public formGroup: FormGroup;
    public showSpinner: boolean;

    constructor(private dataService: DataService) {
        this._initialiseFormGroup();
    }

    ngOnInit() {
    }

    /**
     * API call to load average frequency data.
     */
    public loadAvgFreq(): void {
        if (this.formGroup.invalid) {
            return;
        }
        this.showSpinner = true;

        if (this.config.normal) {
            this.dataService.fetchAvgFaultFrequencies(this.config.normal, this.f.from.value, this.f.to.value).pipe(
                map((avgFreq: AvgFrequency[]) => FfaCardComponent._parseAvgFreqToDataPoint(avgFreq)),
                tap((data: DataPoint[]) => this.normalData = data),
                take(1)
            ).subscribe();
        }

        if (this.config.abnormal) {
            this.dataService.fetchAvgFaultFrequencies(this.config.abnormal, this.f.from.value, this.f.to.value).pipe(
                map((avgFreq: AvgFrequency[]) => FfaCardComponent._parseAvgFreqToDataPoint(avgFreq)),
                tap((data: DataPoint[]) => this.abnormalData = data),
                take(1)
            ).subscribe();
        }
    }

    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            from: new FormControl(null, [Validators.required]),
            to: new FormControl(null, [Validators.required])
        });
    }

    get f() {
        return this.formGroup.controls;
    }

    static _parseAvgFreqToDataPoint(avgFreq: AvgFrequency[]): DataPoint[] {
        return avgFreq.map((f: AvgFrequency) => {
            return {
                x: new Date(f.telemetry_time),
                y: f.avg_frequency_val
            };
        });
    }
}
