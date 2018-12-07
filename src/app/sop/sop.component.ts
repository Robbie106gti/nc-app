import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-sop',
  templateUrl: './sop.component.html',
  styleUrls: ['./sop.component.scss']
})
export class SopComponent implements OnInit {
  title = 'SOP';
  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch({
      type: fromStore.UI_SECTION,
      payload: this.title
    });
  }

  ngOnInit() {}
}
