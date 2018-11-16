import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdsComponent } from './mds.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MdsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdsRoutingModule {}
