import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';

import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: './catalog/catalog.module#CatalogModule'
  },
  {
    path: 'sop',
    loadChildren: './sop/sop.module#SopModule',
    canActivate: [fromGuards.LoginGuard, fromGuards.SopGuard]
  },
  {
    path: 'mds',
    loadChildren: './mds/mds.module#MdsModule',
    canActivate: [fromGuards.LoginGuard, fromGuards.MdsGuard]
  },
  {
    path: 'edit',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate: [fromGuards.LoginGuard, fromGuards.EditGuard]
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [fromGuards.LoginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '',
    component: HomeComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [fromGuards.LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
