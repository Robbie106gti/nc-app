import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent
  },
  {
    path: 'inbox',
    pathMatch: 'full',
    component: InboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
