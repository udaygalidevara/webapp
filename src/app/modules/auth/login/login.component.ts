import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {CognitoUserSession} from 'amazon-cognito-identity-js';
import {StorageService} from '../../../services/storage.service';
import {RouteConstant, StorageConstant} from '../../../constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavService} from '../../../services/nav.service';
import {of, Subject} from 'rxjs';


const CUSTOM_TENANT_ID = 'custom:tenantId';
const CUSTOM_PLANT_ID = 'custom:plantId';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

    public errorMessage: string;
    public loginFG: FormGroup;
    public showPassword = false;
    public showSpinner = false;

    private unsubscribe: Subject<void> = new Subject();

    constructor(private authService: AuthService,
                private navService: NavService) {
        this.authService.logout();
        this._buildLoginFG();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    authenticUser(): void {
        this.showSpinner = true;
        if (this.loginFG.invalid) {
            this.errorMessage = this.loginFG.errors.toString();
            return;
        }
        this.authService.authenticate(this.f.username.value, this.f.password.value).pipe(
            takeUntil(this.unsubscribe),
            tap((result: CognitoUserSession) => {
                /* Store idToken and tenantId. */
                StorageService.setItem(StorageConstant.ID_TOKEN, result.getIdToken().getJwtToken());
                StorageService.setItem(StorageConstant.PLANT_ID, result.getIdToken().payload[CUSTOM_PLANT_ID]);
                StorageService.setItem(StorageConstant.TENANT_ID, result.getIdToken().payload[CUSTOM_TENANT_ID]);
                /* Navigate to dashboard. */
                this.navService.navigate(RouteConstant.DASHBOARD);
            }),
            catchError((err) => {
                this.showSpinner = false;
                this.errorMessage = err.message;
                return of(null);
            })
        ).subscribe();
    }

    /**
     * Initialise login form group.
     *
     * @private
     */
    private _buildLoginFG(): void {
        this.loginFG = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    get f() {
        return this.loginFG.controls;
    }
}
