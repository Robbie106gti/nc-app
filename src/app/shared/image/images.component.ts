import { Component, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ImageModal, HtmlImagesModal } from './images';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnChanges, AfterContentInit {
  body: any = document.body;
  @Input() imageModal: ImageModal;
  @Input() doc: any;
  images: HtmlImagesModal = { current: { title: 'none', image: 'none' }, items: [] };


  constructor() { }

  ngAfterContentInit(): void {
    this.stopScrolling();
    if (this.doc.images) {
      this.images.items = [...this.doc.images, { title: this.doc.title, image: this.doc.image }];
    } else {
      this.images.items = [ { title: this.doc.title, image: this.doc.image }];
    }
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

  trackByFn(index, item) {
    return index;
  }

  stopScrolling() {
    // console.log(this.imageModal);
    this.imageModal.open === true ? this.body.classList.add('stopScrolling') : this.body.classList.remove('stopScrolling');
  }

  nextImage() {
    const i = (this.images.current.index + 1) > (this.images.items.length - 1) ? 0 : (this.images.current.index + 1);
    this.changeImage(this.images.items[i].image);
  }

  previousImage() {
    const i = (this.images.current.index - 1) < 0 ? (this.images.items.length - 1) : (this.images.current.index - 1);
    this.changeImage(this.images.items[i].image);
  }

  changeImage(image) {
    if (this.doc.list) {
      this.images.current.list = this.doc.list.filter(li => {
        if (li.image) {
          if (li.image.image === image) {
            return li;
          }}})[0];
    }
    this.images.items = this.images.items.map((item, index) => {
      item.current = false;
      item.index = index;
      if (item.image === image) {
        this.images.current = {...this.images.current , ...item};
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
