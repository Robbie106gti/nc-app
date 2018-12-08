import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopRoutingModule } from './sop-routing.module';
import { SopComponent } from './sop.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
@NgModule({
  declarations: [SopComponent],
  imports: [
    CommonModule,
    SopRoutingModule,
    SharedModule,
    StoreModule.forFeature('sopsState', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class SopModule {}
