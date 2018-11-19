import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUser);
  }

  ngOnInit() {}
}
