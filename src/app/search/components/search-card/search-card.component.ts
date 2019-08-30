import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
  @Input() card: any;
  link: any;

  constructor() { }
  ngOnInit() {
    this.constructLink(this.card);
  }

  constructLink(card) {
    const newlink = ['/'];
    newlink.push(card.type);
    if (card.sub) newlink.push(card.sub);
    if (card.subCat && card.subCat !== 'false') newlink.push(card.subCat);
    newlink.push(card.link);
    this.link = newlink;
    console.log(this.link);
  }

  trackByFn(index, item) {
    return item.id || index;
  }
}
