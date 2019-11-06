import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {NavService} from '../nav.service';
import {StorageService} from '../storage.service';
import {RouteConstant, StorageConstant} from '../../constants';


@Injectable({
    providedIn: 'root'
})
export class CloudGuard implements CanActivate {

    constructor(private storageService: StorageService,
                private navService: NavService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (StorageService.getItem(StorageConstant.ID_TOKEN)) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.navService.navigate(RouteConstant.LOGIN);
        return false;
    }

}
