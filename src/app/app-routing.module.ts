import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstant} from './constants';
import {CloudGuard} from './services/guards/cloud.guard';


const routes: Routes = [
    {path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
    {path: 'console', loadChildren: './modules/console/console.module#ConsoleModule', canActivate: [CloudGuard]},
    {path: '**', redirectTo: RouteConstant.CONSOLE, pathMatch: 'full'}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
