import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  attempt$: Observable<number>;
  loginerror$: Observable<string>;
  constructor(private store: Store<fromStore.State>) {
    this.attempt$ = this.store.select(fromStore.getLoginTries);
    this.loginerror$ = this.store.select(fromStore.getLoginError);
  }

  Login(user) {
    if (user.password <= 1) {
      alert('Please fill in a password');
      return null;
    }
    if (user.username <= 1) {
      alert('Please fill in a username');
      return null;
    }
    this.store.dispatch({ type: fromStore.LOGINWQ, payload: user });
  }
}
