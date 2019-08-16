import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs';
import { Search } from './search';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  title = 'Search';
  results$: Observable<Search>;
  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch({
      type: fromStore.UI_SECTION,
      payload: this.title
    });
    this.results$ = this.store.select(fromStore.getSearch);
  }

  Search(val) {
    this.store.dispatch({ type: fromStore.SEARCH, payload: val });
  }

}
