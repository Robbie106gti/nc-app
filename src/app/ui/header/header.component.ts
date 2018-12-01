import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Categories, Dashboard } from 'src/app/models/ui';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<any>;
  dashboard$: Observable<Dashboard[]>;
  categories$: Observable<Categories[]>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUserState);
    this.dashboard$ = this.store.select(fromStore.getUiDashboard);
    this.categories$ = this.store.select(fromStore.getUiCategories);
  }
}
