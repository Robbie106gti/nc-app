import {
  Component, Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { List } from './list';
import { ImageModal } from '../image/images';
declare var M: any;

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: List;
  @Output() imageModal = new EventEmitter<ImageModal>();

  constructor() { }

  openImageModal(image: string) {
    this.imageModal.emit({ open: true, imageurl: image });
  }

}
