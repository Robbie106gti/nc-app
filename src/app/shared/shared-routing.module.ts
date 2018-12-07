import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderconstructionComponent } from './underconstruction/underconstruction.component';

const routes: Routes = [
  {
    path: 'underconstruction',
    pathMatch: 'full',
    component: UnderconstructionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
