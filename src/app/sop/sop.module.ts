import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopRoutingModule } from './sop-routing.module';
import { SopComponent } from './sop.component';
import { SharedModule } from '../shared/shared.module';

// guards SOP's
import * as fromGuards from './guards';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { CategoryComponent } from './views/category/category.component';
import { DocumentComponent } from './views/document/document.component';
@NgModule({
  declarations: [SopComponent, CategoryComponent, DocumentComponent],
  imports: [
    CommonModule,
    SopRoutingModule,
    SharedModule,
    StoreModule.forFeature('sopsState', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...fromGuards.sopguards
  ]
})
export class SopModule {}
