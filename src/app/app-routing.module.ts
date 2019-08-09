import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';

import { LoginComponent } from './ui/login/login.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';

const routes: Routes = [
  {
    path: 'sop',
    loadChildren: './sop/sop.module#SopModule',
    canActivateChild: [fromGuards.LoginGuard, fromGuards.SopGuard]
  },
  {
    path: 'mds',
    loadChildren: './mds/mds.module#MdsModule',
    canActivateChild: [fromGuards.LoginGuard],
    canActivate: [fromGuards.MdsGuard]
  },
  {
    path: 'edit',
    loadChildren: './editor/editor.module#EditorModule',
    canActivateChild: [fromGuards.LoginGuard],
    canActivate: [fromGuards.EditGuard]
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivateChild: [fromGuards.LoginGuard]
  },
  {
    path: '',
    loadChildren: './catalog/catalog.module#CatalogModule',
    canActivate: [fromGuards.CatalogGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'spinner',
    pathMatch: 'full',
    component: SpinnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
