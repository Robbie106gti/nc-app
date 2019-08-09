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

const doc = {
  active: true,
  createdAt: { seconds: 1547072465, nanoseconds: 413000000 },
  createdBy: 'Harry Janzen',
  description: {
    description: 'How to get reimbursed.',
    title: 'Payng for, paid by'
  },
  id: 'veYeksVvUVQEtyN9newg',
  idCat: 'QvbEGnIHgOWJwwUSv7r6',
  image:
    'https://firebasestorage.googleapis.com/v0/b/nickels-catalog.appspot.com/o/sop%2Fmain%2F1547072205767_expense.JPG?alt=media&token=9038c634-ddcf-4a0c-8412-39e6d0b69f0c',
  imageimportant: false,
  images: [
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/nickels-catalog.appspot.com/o/sop%2FAccounting%2FExpense%20Voucher%2F1547072380834_expense1.JPG?alt=media&token=ddd2f748-94cf-419d-908f-3a1e7ffcfd2a',
      size: 'large',
      title: 'exp1'
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/nickels-catalog.appspot.com/o/sop%2FAccounting%2FExpense%20Voucher%2F1547072393685_expense2.JPG?alt=media&token=8928865a-12ad-4280-a85d-3ba26fd09bbc',
      size: 'large',
      title: 'exp2'
    }
  ],
  link: 'expense-voucher',
  sort: 100,
  sub: 'accounting',
  title: 'Expense Voucher',
  updated: true,
  updatedAt: { seconds: 1565382898, nanoseconds: 585000000 },
  updatedBy: 'Robert Leeuwerink',
  url: ['sop', 'accounting', 'expense-voucher']
};
