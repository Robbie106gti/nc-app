import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  attempt$: Observable<number>;
  loginerror$: Observable<string>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  entrypoint$: Observable<string>;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.attempt$ = this.store.select(fromStore.getLoginTries);
    this.loginerror$ = this.store.select(fromStore.getLoginError);
    this.loading$ = this.store.select(fromStore.getUserLoading);
    this.loaded$ = this.store.select(fromStore.getUserLoaded);
    this.entrypoint$ = this.store.select(fromStore.getUserEntrypoint);
  }

  ngOnInit(): void {
    this.loaded$.subscribe(loaded => {
      if (loaded === true) {
        console.log({ loaded });
        this.entrypoint$.subscribe(entry => {
          console.log({ start: `Navigate to ${entry}` });
          if (entry === '/login') {
            this.router.navigate(['']);
          } else {
            let route = entry.split('?');
            const params = route[1];
            route = route[0].split('/');
            this.router.navigate(['sop']);
          }
        });
      }
    });
    this.loaded$.pipe(map(loaded => console.log({ map: loaded })));
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
