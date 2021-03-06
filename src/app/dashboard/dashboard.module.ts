import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { InboxComponent } from './inbox/inbox.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    InboxComponent,
    LogoutComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
