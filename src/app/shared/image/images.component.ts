import { Component, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnChanges, AfterContentInit {
  body: any = document.body;
  @Input() open: boolean;
  @Input() doc: any;
  @Input() selected: string;
  images: { items: any, current: { title: string; image: string; } } = { items: [], current: { title: 'none', image: 'none' } };


  constructor() { }

  ngAfterContentInit(): void {
    this.stopScrolling(this.open);
    this.images.items = [...this.doc.images, { title: this.doc.title, image: this.doc.image }];
    if (!this.selected) {
      this.changeImage(this.doc.image)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      console.log(this.open)
      this.stopScrolling(this.open);
    }
  }

  stopScrolling(open) {
    open === true ? this.body.classList.add('stopScrolling') : this.body.classList.remove('stopScrolling');
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
    // this.images.current = this.images.items.filter(item => item.image === image)[0];
  }

  close(close) {
    this.open = close;
  }

}
