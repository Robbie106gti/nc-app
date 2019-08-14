import { Component, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ImageModal } from './images';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnChanges, AfterContentInit {
  body: any = document.body;
  @Input() imageModal: ImageModal;
  @Input() doc: any;
  images: { items: any, current: { title: string; image: string; } } = { items: [], current: { title: 'none', image: 'none' } };


  constructor() { }

  ngAfterContentInit(): void {
    this.stopScrolling();
    this.images.items = [...this.doc.images, { title: this.doc.title, image: this.doc.image }];
    if (!this.imageModal.imageurl) {
      this.changeImage(this.doc.image)
    } else {
      this.changeImage(this.imageModal.imageurl)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageModal.open']) {
      // console.log(this.imageModal.open);
      this.stopScrolling();
    }
  }

  stopScrolling() {
    // console.log(this.imageModal);
    this.imageModal.open === true ? this.body.classList.add('stopScrolling') : this.body.classList.remove('stopScrolling');
  }

  changeImage(image) {
    this.images.items = this.images.items.map(item => {
      item.current = false;
      if (item.image === image) {
        this.images.current = item;
        item.current = true;
        item.clicked = true;
      }
      return item;
    });
  }

  close() {
    this.imageModal.open = false;
    this.body.classList.remove('stopScrolling');
  }

}
