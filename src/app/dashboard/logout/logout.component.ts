import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.LogoutUser();
  }

  LogoutUser() {
    this.router.navigate(['']);
    this.store.dispatch({ type: fromStore.LOGOUT });
  }
}
