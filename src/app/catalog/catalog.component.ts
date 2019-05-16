import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import * as fromRoot from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  title = 'Catalogues';
  cats$: Observable<any>;
  constructor(private store: Store<fromStore.CatalogState>) {
    this.store.dispatch({
      type: fromRoot.UI_SECTION,
      payload: this.title
    });
    this.cats$ = this.store.select(fromStore.getMainCatalogArray);
  }

  ngOnInit() {}
}
