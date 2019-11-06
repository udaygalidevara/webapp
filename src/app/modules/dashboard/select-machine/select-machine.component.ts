import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataConfig, Machine} from '../../../interfaces';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-select-machine',
    templateUrl: './select-machine.component.html',
    styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit {

    @Input() machines: Machine[];
    @Output() config: EventEmitter<DataConfig> = new EventEmitter();

    public maxDateTime = new Date();

    public formGroup: FormGroup;

    constructor() {
        this._initialiseFormGroup();
    }

    get f() {
        return this.formGroup.controls;
    }

    ngOnInit() {
    }

    /**
     * Converts form values into data-config object and emit back to parent component.
     */
    loadData(): void {
        if (this.formGroup.invalid) {
            return;
        }

        this.config.emit({
            normal: this.f.normalMachine.value,
            normalTS: this.f.normalTS.value._d.getTime(),
            abnormal: this.f.abnormalMachine.value,
            abnormalTS: this.f.abnormalTS.value._d.getTime()
        });
    }

    /**
     * Sets a default date if not selected.
     *
     * @param event: Object
     */
    syncTimestamp(event): void {
        for (const fc of [this.f.normalTS, this.f.abnormalTS]) {
            if (!fc.value) {
                fc.setValue(event.value);
            }
        }
    }

    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            normalMachine: new FormControl(null),
            normalTS: new FormControl(null),
            abnormalMachine: new FormControl(null),
            abnormalTS: new FormControl(null)
        }, {
            validators: SelectMachineComponent.alteastOneMachine
        });
    }

    static alteastOneMachine(AC: AbstractControl) {
        const get = (key: string) => {
            return AC.get(key).value;
        };
        if ((get('normalMachine') && get('normalTS')) ||
            (get('abnormalMachine') && get('abnormalTS'))) {
            AC.get('abnormalMachine').setErrors(null);
            AC.get('normalMachine').setErrors(null);
        } else if (get('normalMachine') && get('normalTS')) {
            AC.get('abnormalMachine').setErrors({required: true});
        } else {
            AC.get('normalMachine').setErrors({required: true});
        }
        return null;
    }
}
