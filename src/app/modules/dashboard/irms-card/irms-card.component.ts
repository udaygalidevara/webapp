import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataConfig, DataPoint, IrmsFrequency} from '../../../interfaces';
import {DataService} from '../../../services/data.service';
import {map, take, tap} from 'rxjs/operators';


@Component({
    selector: 'app-irms-card',
    templateUrl: './irms-card.component.html',
    styleUrls: ['./irms-card.component.scss']
})
export class IrmsCardComponent implements OnChanges, OnInit {

    @Input() config: DataConfig;

    public normalData: DataPoint[];
    public abnormalData: DataPoint[];

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            this._fetchIrmsData();
        }
    }

    private _fetchIrmsData(): void {
        if (this.config.normal) {
            this.dataService.fetchIrmsFrequencies(this.config.normal, this.config.normalTS).pipe(
                map((irms: IrmsFrequency[]) => IrmsCardComponent._parseIrmsToDataPoint(irms)),
                tap((data: DataPoint[]) => this.normalData = data),
                take(1)
            ).subscribe();
        }

        if (this.config.abnormal) {
            this.dataService.fetchIrmsFrequencies(this.config.abnormal, this.config.abnormalTS).pipe(
                map((irms: IrmsFrequency[]) => IrmsCardComponent._parseIrmsToDataPoint(irms)),
                tap((data: DataPoint[]) => this.abnormalData = data),
                take(1)
            ).subscribe();
        }
    }

    static _parseIrmsToDataPoint(irms: IrmsFrequency[]): DataPoint[] {
        return irms.map((f: IrmsFrequency) => {
            return {
                x: new Date(f.telemetry_time),
                y: f.i_rms
            };
        });
    }
}
