import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import * as fromRoot from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sop.component.html',
  styleUrls: ['./sop.component.scss']
})
export class SopComponent implements OnInit {
  title = 'SOP';
  cats$: Observable<any>;
  constructor(
    private store: Store<fromStore.SopsState>,
    private storeRoot: Store<fromRoot.State>
  ) {
    this.store.dispatch({
      type: fromRoot.UI_SECTION,
      payload: this.title
    });
    this.cats$ = this.store.select(fromStore.getSopArray);
  }

  ngOnInit() {}
}
