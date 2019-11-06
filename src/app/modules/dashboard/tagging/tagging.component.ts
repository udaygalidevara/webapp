import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {DatetimeUtil} from '../../../utils/datetime.util';
import {DataConfig, Machine, MachineFault} from '../../../interfaces';
import {DataService} from '../../../services/data.service';
import {take, tap} from 'rxjs/operators';


@Component({
    selector: 'app-tagging',
    templateUrl: './tagging.component.html',
    styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnChanges, OnDestroy, OnInit {

    @Input() config: DataConfig;

    public machineFaultPair: { machine: Machine, fault: MachineFault }[];
    public formGroup: FormGroup;
    public maxDateTime = new Date();

    private unsubscribe: Subject<void> = new Subject();

    constructor(private snackBar: MatSnackBar,
                private dataService: DataService) {
        this._initialiseFormGroup();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            this._processFaultTypes(this.config);
        }
    }

    submit(): void {
        if (this.formGroup.invalid) {
            return;
        }
        const range = this.f.faultRange.value;
        if (!Array.isArray(range) || range.length !== 2) {
            return;
        }
        const start = DatetimeUtil.convertTimestampToDateString(new Date(range[0]).getTime());
        const end = DatetimeUtil.convertTimestampToDateString(new Date(range[1]).getTime());
        const pair = this.f.faultType.value;

        this.dataService.postTagData(pair.machine, pair.fault, start, end).pipe(
            tap(() => {
                this.formGroup.reset();
                this.openSnackBar('Tagging successful', 'Close');
            }),
            take(1)
        ).subscribe();
    }

    /**
     * Combine moving parts from Normal and Abnormal machines into a single list.
     *
     * @param config
     * @private
     */
    private _processFaultTypes(config: DataConfig): void {
        /*this.machineFaultPair = [
            ...this.config.normal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.normal,
                    fault: flt
                };
            }),
            ...this.config.abnormal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.abnormal,
                    fault: flt
                };
            })
        ];*/
        const pairs = [];
        if (this.config.normal && this.config.normalTS) {
            pairs.push(...this.config.normal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.normal,
                    fault: flt
                };
            }));
        }
        if (this.config.abnormal && this.config.abnormalTS) {
            pairs.push(...this.config.abnormal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.abnormal,
                    fault: flt
                };
            }));
        }
        this.machineFaultPair = pairs;
    }

    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            faultType: new FormControl(null, [Validators.required]),
            faultRange: new FormControl(null, [Validators.required])
        });
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    get f() {
        return this.formGroup.controls;
    }
}
