import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderconstructionComponent } from './underconstruction/underconstruction.component';
import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './card/card.component';
import { DescriptionComponent } from './description/description.component';
import { ImageBlockComponent } from './image-block/image-block.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { NoteComponent } from './note/note.component';
import { ListComponent } from './list/list.component';
import { ImagesComponent } from './image/images.component';
import { LoadingComponent } from './loading/loading.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [UnderconstructionComponent, CardComponent, DescriptionComponent, ImageBlockComponent, GeneralInfoComponent, NoteComponent, ListComponent, ImagesComponent, LoadingComponent],
  imports: [CommonModule, SharedRoutingModule, MatCardModule],
  exports: [UnderconstructionComponent, CardComponent, DescriptionComponent, ImageBlockComponent, GeneralInfoComponent, NoteComponent, ListComponent, ImagesComponent, LoadingComponent]
})
export class SharedModule { }
