import {Machine} from './machine.interface';


export interface DataConfig {
    normal: Machine;
    normalTS: number;
    abnormal: Machine;
    abnormalTS: number;
}
