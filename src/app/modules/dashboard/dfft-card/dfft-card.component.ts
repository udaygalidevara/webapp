import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataConfig, Frequency, Machine, MachineFault} from '../../../interfaces';
import {take, tap} from 'rxjs/operators';
import {DataService} from '../../../services/data.service';


@Component({
    selector: 'app-dfft-card',
    templateUrl: './dfft-card.component.html',
    styleUrls: ['./dfft-card.component.scss']
})
export class DfftCardComponent implements OnChanges, OnInit {

    @Input() config: DataConfig;

    public custFreqEnabled: boolean;
    public customFreq: string;

    public abnormalFreq: Frequency[];
    public normalFreq: Frequency[];

    public machineFaultPair: { machine: Machine, fault: MachineFault }[];
    public selectedFault: MachineFault;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            this._processMovingParts(this.config);
            this._fetchFrequencies(this.config);
        }
    }

    /**
     * Set vertical lines in chart based on selected machine-fault.
     *
     * @param event
     */
    setFaultFrequency(event: { machine: Machine, fault: MachineFault }): void {
        if (!event) {
            return;
        }
        this.selectedFault = {
            ...event.fault,
            fault_frequencies: event.fault.fault_frequencies.map((v: number) => v * event.machine.frequency_resolution)
        };
    }

    setCustomFreq(): void {
        this.selectedFault = {
            fault_id: -1,
            fault_name: 'Custom',
            fault_frequencies: this.customFreq.split(',').map((s) => +s.trim())
        };
    }

    /**
     * Fetch frequencies for normal and abnormal machines.
     *
     * @param config
     * @private
     */
    private _fetchFrequencies(config: DataConfig): void {

        /* Fetch frequencies for normal machine. */
        if (config.normal) {
            this.dataService.fetchFrequencies(config.normal, config.normalTS).pipe(
                tap((freq: Frequency[]) => this.normalFreq = freq),
                take(1)
            ).subscribe();
        }

        if (config.abnormal) {
            /* Fetch frequencies for abnormal machine. */
            this.dataService.fetchFrequencies(config.abnormal, config.abnormalTS).pipe(
                tap((freq: Frequency[]) => this.abnormalFreq = freq),
                take(1)
            ).subscribe();
        }
    }

    /**
     * Combine moving parts from Normal and Abnormal machines into a single list.
     *
     * @param config
     * @private
     */
    private _processMovingParts(config: DataConfig): void {
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
}
