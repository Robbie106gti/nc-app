import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopRoutingModule } from './sop-routing.module';
import { SopComponent } from './sop.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SopComponent],
  imports: [CommonModule, SopRoutingModule, SharedModule]
})
export class SopModule {}
