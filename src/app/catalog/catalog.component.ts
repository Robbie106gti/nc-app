import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  title = 'Catalogues';
  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch({
      type: fromStore.UI_SECTION,
      payload: this.title
    });
  }

  ngOnInit() {}
}
