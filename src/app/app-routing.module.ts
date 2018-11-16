import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UsersComponent } from './users/users/users.component';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { InboxComponent } from './users/inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LogoutComponent
  },
  {
    path: 'inbox',
    pathMatch: 'full',
    component: InboxComponent
  },
  {
    path: 'catalog',
    pathMatch: 'full',
    loadChildren: './catalog/catalog.module#CatalogModule'
  },
  {
    path: 'sop',
    pathMatch: 'full',
    loadChildren: './sop/sop.module#SopModule'
  },
  {
    path: 'mds',
    pathMatch: 'full',
    loadChildren: './mds/mds.module#MdsModule'
  },
  {
    path: 'edit',
    pathMatch: 'full',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: './search/search.module#SearchModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
