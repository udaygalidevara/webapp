import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../storage.service';
import {StorageConstant} from '../../constants';


const TENANT_ID = 'tenant_id';
const PLANT_ID = 'plant_id';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = StorageService.getItem(StorageConstant.ID_TOKEN);
        if (idToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: idToken,
                    'Content-Type': 'application/json'
                },
                params: request.params
                    .append(TENANT_ID, StorageService.getItem(StorageConstant.TENANT_ID))
                    .append(PLANT_ID, StorageService.getItem(StorageConstant.PLANT_ID))
            });
        }
        return next.handle(request);
    }
}
