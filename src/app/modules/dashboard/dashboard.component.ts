import {Component, OnInit} from '@angular/core';
import {DataConfig, Machine} from '../../interfaces';
import {DataService} from '../../services/data.service';
import {take, tap} from 'rxjs/operators';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public config: DataConfig;
    public machines: Machine[];

    constructor(private dataService: DataService) {
        this._fetchMachines();
    }

    ngOnInit() {
    }

    /**
     * Fetch all equipments.
     *
     * @private
     */
    private _fetchMachines(): void {
        this.dataService.fetchAllMachines().pipe(
            tap((machines: Machine[]) => this.machines = machines),
            take(1)
        ).subscribe();
    }

}
