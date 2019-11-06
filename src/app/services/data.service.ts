import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AvgFrequency, Frequency, IrmsFrequency, Machine, MachineFault, RawFrequency} from '../interfaces';
import {environment} from '../../environments/environment';
import {EndpointConstant, StorageConstant} from '../constants';
import {map} from 'rxjs/operators';
import {DatetimeUtil} from '../utils/datetime.util';
import {StorageService} from './storage.service';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    readonly baseUri: string;

    constructor(private http: HttpClient) {
        this.baseUri = environment.baseUri;
    }

    fetchAllMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(`${this.baseUri}/${EndpointConstant.GET_EQUIPMENTS}`);
    }

    fetchFrequencies(machine: Machine, timestamp: number): Observable<Frequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_TRANSFORMED_DATA}?equipment_id=${machine.id}&time_stamp="${timeString}"`;

        return this.http.get<RawFrequency>(url).pipe(
            map((rawData: RawFrequency) => {
                const freqs: Frequency[] = [];
                rawData.transformedData.forEach((v: number, i: number) => {
                    freqs.push({
                        /* Udpate frequency with respective factor. */
                        f: Math.floor(i / machine.frequency_resolution),
                        v
                    });
                });
                return freqs;
            }),
        );
    }

    fetchAvgFaultFrequencies(machine: Machine, fromFreq: number, toFreq: number): Observable<AvgFrequency[]> {
        const url = `${this.baseUri}/${EndpointConstant.GET_AVG_FAULT_FREQUENCY}?equipment_id=${machine.id}&from_freq=${fromFreq}&to_freq=${toFreq}`;
        return this.http.get<AvgFrequency[]>(url);
    }

    fetchIrmsFrequencies(machine: Machine, timestamp: number): Observable<IrmsFrequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_IRMS_FREQUENCY}?equipment_id=${machine.id}&date=${timeString}`;
        return this.http.get<IrmsFrequency[]>(url);
    }

    postTagData(machine: Machine, fault: MachineFault, fromDate: string, toDate: string): Observable<string> {
        const payload = {
            equipment_id: machine.id,
            tenant_id: StorageService.getItem(StorageConstant.TENANT_ID),
            plant_id: StorageService.getItem(StorageConstant.PLANT_ID),
            fault_id: fault.fault_id,
            from_date: fromDate,
            to_date: toDate,
        };
        return this.http.post<string>(`${this.baseUri}/${EndpointConstant.POST_EQUIPMENT_FAULT_INSTANCES}`, payload);
    }
}
