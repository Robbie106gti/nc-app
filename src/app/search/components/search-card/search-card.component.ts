import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
  @Input() card: any;
  @Input() query: string;
  link: any;
  content: any;

  constructor() { }
  ngOnInit() {
    this.constructLink(this.card);
    this.highlightContent(this.card);

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
  highlightContent(card) {
    const regexp = new RegExp(this.query, 'gi');
    const result = card.content.split(regexp);
    const hg = card.content.match(regexp);
    const arr = [];
    result.map((res, index) => {
      arr.push({hg: false, text: res});
      if (hg.length > index) arr.push({hg: true, text: hg[index]});

    })
    this.content = arr;
    console.log({result, hg, query: this.query, content: card.content});
  }

  trackByFn(index, item) {
    return item.id || index;
  }
}
