import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Categories, Dashboard, Section } from 'src/app/models/ui';
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<any>;
  qparams$: Observable<any>;
  dashboard$: Observable<Dashboard[]>;
  categories$: Observable<Categories[]>;
  section$: Observable<Section>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUserState);
    this.dashboard$ = this.store.select(fromStore.getUiDashboard);
    this.categories$ = this.store.select(fromStore.getUiCategories);
    this.section$ = this.store.select(fromStore.getUISection);
    this.qparams$ = this.store.select(fromStore.getRouterQueryParams);
  }
}
