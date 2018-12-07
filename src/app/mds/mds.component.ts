import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-mds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mds.component.html',
  styleUrls: ['./mds.component.scss']
})
export class MdsComponent implements OnInit {
  title = 'MDS';
  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch({
      type: fromStore.UI_SECTION,
      payload: this.title
    });
  }

  ngOnInit() {}
}
