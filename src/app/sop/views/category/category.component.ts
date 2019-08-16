import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  title = 'SOP';
  doc$: Observable<any>;
  cats$: Observable<any>;
  constructor(
    private store: Store<fromStore.SopsState>
  ) {
    this.store.dispatch({
      type: fromRoot.UI_SECTION,
      payload: this.title
    });
    this.doc$ = this.store.select(fromStore.getMainSopCat);
    this.cats$ = this.store.select(fromStore.getSubSopCat);
  }

  trackByFn(index, item) {
    return item.id || index;
  }

}
