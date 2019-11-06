import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavNode} from '../../../interfaces';


@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnChanges, OnInit {

    @Input() activePath: string;
    @Input() node: NavNode;

    public isActive: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activePath && changes.activePath.currentValue) {
            this.isActive = this.activePath === this.node.path;
        }
    }
}
