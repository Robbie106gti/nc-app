import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any>;
  favorites$: Observable<any>;
  notes$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUser);
    this.favorites$ = this.store.select(fromStore.getUserFavorites);
    this.notes$ = this.store.select(fromStore.getUserNotes);
  }

  ngOnInit() {}
}
