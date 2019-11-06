import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsoleComponent} from './console.component';
import {RouteConstant} from '../../constants';


const routes: Routes = [
    {
        path: '',
        component: ConsoleComponent,
        children: [
            {path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
            {path: '**', redirectTo: RouteConstant.DASHBOARD, pathMatch: 'full'},
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsoleRoutingModule {
}
