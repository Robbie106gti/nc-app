import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderconstructionComponent } from './underconstruction/underconstruction.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [UnderconstructionComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [UnderconstructionComponent]
})
export class SharedModule {}
