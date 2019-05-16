import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, CatalogRoutingModule,
    SharedModule,
    StoreModule.forFeature('catalogState', reducers),
    EffectsModule.forFeature(effects)]
})
export class CatalogModule {}
