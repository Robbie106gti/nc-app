import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Header, Categories, Dashboard } from 'src/app/models/ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>;
  dashboard$: Observable<Dashboard[]>;
  categories$: Observable<Categories[]>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUser);
    this.dashboard$ = this.store.select(fromStore.getUiDashboard);
    this.categories$ = this.store.select(fromStore.getUiCategories);
  }

  ngOnInit() {}
}
