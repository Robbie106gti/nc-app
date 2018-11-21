import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: './catalog/catalog.module#CatalogModule'
  },
  {
    path: 'sop',
    loadChildren: './sop/sop.module#SopModule'
  },
  {
    path: 'mds',
    loadChildren: './mds/mds.module#MdsModule'
  },
  {
    path: 'edit',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
