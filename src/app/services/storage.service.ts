import {Injectable} from '@angular/core';
import {StorageConstant} from '../constants';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    /* Id Token */
    public static getItem(key: string): string {
        return localStorage.getItem(key);
    }

    public static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static removeItem(key) {
        localStorage.removeItem(key);
    }

    public static removeAll() {
        this.removeItem(StorageConstant.ID_TOKEN);
        this.removeItem(StorageConstant.TENANT_ID);
        this.removeItem(StorageConstant.PLANT_ID);
    }
}
