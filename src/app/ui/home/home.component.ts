import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Categories } from 'src/app/models/ui';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$: Observable<Categories[]>;

  constructor(private store: Store<fromStore.State>) {
    this.categories$ = this.store.select(fromStore.getUiCategories);
  }

  ngOnInit() {}
}
