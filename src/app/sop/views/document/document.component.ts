import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  title = 'SOP';
  doc$: Observable<any>;

  constructor(private store: Store<fromStore.SopsState>) {
    this.store.dispatch({
      type: fromRoot.UI_SECTION,
      payload: this.title
    });
    this.doc$ = this.store.select(fromStore.getSopDoc);
  }

}
