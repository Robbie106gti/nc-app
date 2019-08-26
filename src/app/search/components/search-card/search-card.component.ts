import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent {
  @Input() card: any;

  constructor() { }

  trackByFn(index, item) {
    return item.id || index;
  }
}
