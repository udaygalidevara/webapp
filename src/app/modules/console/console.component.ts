import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouteConstant} from '../../constants';
import {NavService} from '../../services/nav.service';


const MOBILE_WIDTH = 992;


@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

    public mobileView: boolean = window.innerWidth <= MOBILE_WIDTH;     // Is mobile view active

    constructor(private router: Router,
                private navService: NavService) {
        if (router.url === RouteConstant.CONSOLE) {
            this.navService.navigate(RouteConstant.DASHBOARD);
        }
    }

    @HostListener('window:resize')
    onResize() {
        this.mobileView = window.innerWidth <= MOBILE_WIDTH;
    }

    ngOnInit() {
    }
}
