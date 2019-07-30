import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SopComponent } from './sop.component';
import { CategoryComponent } from './views/category/category.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SopComponent
  },
  {
    path: ':sop',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SopRoutingModule {}
