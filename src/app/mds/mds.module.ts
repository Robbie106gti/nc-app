import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdsRoutingModule } from './mds-routing.module';
import { MdsComponent } from './mds.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MdsComponent],
  imports: [CommonModule, MdsRoutingModule, SharedModule]
})
export class MdsModule {}
