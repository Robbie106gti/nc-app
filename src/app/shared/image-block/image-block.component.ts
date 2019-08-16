import {
  Component, Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ImageBlock } from './image-block';
import { ImageModal } from '../image/images';

@Component({
  selector: 'app-image-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.css']
})
export class ImageBlockComponent {
  @Input() image: ImageBlock;
  @Output() imageModal = new EventEmitter<ImageModal>();

  constructor() { }

  openImageModal(image) {
    this.imageModal.emit({ open: true, imageurl: image });
  }

  trackByFn(index, item) {
    return index;
  }

}
