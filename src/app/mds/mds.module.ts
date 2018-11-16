import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdsRoutingModule } from './mds-routing.module';
import { MdsComponent } from './mds.component';

@NgModule({
  declarations: [MdsComponent],
  imports: [
    CommonModule,
    MdsRoutingModule
  ]
})
export class MdsModule { }
