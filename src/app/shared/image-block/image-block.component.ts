import { Component, Input } from '@angular/core';
import { ImageBlock } from './image-block';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.css']
})
export class ImageBlockComponent {
  @Input()  image: ImageBlock;

  constructor() { }

}
