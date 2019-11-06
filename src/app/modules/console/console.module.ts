import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsoleRoutingModule} from './console-routing.module';
import {ConsoleComponent} from './console.component';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavItemComponent} from './nav-item/nav-item.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ToolbarComponent} from './toolbar/toolbar.component';


@NgModule({
    declarations: [
        ConsoleComponent,
        NavItemComponent,
        NavigationComponent,
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        ConsoleRoutingModule,

        /* Material modules */
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
    ]
})
export class ConsoleModule {
}
