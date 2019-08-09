import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';

import { SopComponent } from './sop.component';
import { CategoryComponent } from './views/category/category.component';
import { DocumentComponent } from './views/document/document.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SopComponent
  },
  {
    path: ':sop',
    component: CategoryComponent,
    canActivate: [fromGuards.CategoryGuard]
  },
  {
    path: ':sop/:doc',
    component: DocumentComponent,
    canActivate: [fromGuards.CategoryGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SopRoutingModule {}
