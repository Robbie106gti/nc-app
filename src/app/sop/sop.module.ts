import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopRoutingModule } from './sop-routing.module';
import { SopComponent } from './sop.component';

@NgModule({
  declarations: [SopComponent],
  imports: [
    CommonModule,
    SopRoutingModule
  ]
})
export class SopModule { }
