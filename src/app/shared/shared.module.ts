import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderconstructionComponent } from './underconstruction/underconstruction.component';
import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [UnderconstructionComponent, CardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [UnderconstructionComponent, CardComponent]
})
export class SharedModule {}
