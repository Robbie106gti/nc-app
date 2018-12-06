import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Categories } from 'src/app/models/ui';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$: Observable<Categories[]>;

  constructor(private store: Store<fromStore.State>) {
    this.categories$ = this.store.select(fromStore.getUiCategories);
    this.store.dispatch({
      type: fromStore.UI_SECTION,
      payload: 'Nickels Custom Cabinets'
    });
  }

  ngOnInit() {}
}
