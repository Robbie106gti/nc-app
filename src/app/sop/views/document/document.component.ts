import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../store';
import { Observable, of } from 'rxjs';
import { ImageModal } from 'src/app/shared/image/images';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  title = 'SOP';
  doc$: Observable<any>;
  imageModal: ImageModal = { open: false, imageurl: null };

  constructor(private store: Store<fromStore.SopsState>) {
    this.store.dispatch({
      type: fromRoot.UI_SECTION,
      payload: this.title
    });
    this.doc$ = this.store.select(fromStore.getSopDoc);
  }

  openImageModal(obj: ImageModal) {
    this.imageModal = obj;
  }

}
