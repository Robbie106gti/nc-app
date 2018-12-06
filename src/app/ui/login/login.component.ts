import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { switchMap, map, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  attempt$: Observable<number>;
  loginerror$: Observable<string>;
  entry$: Observable<string>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.attempt$ = this.store.select(fromStore.getLoginTries);
    this.loginerror$ = this.store.select(fromStore.getLoginError);
    this.loading$ = this.store.select(fromStore.getUserLoading);
    this.loaded$ = this.store.select(fromStore.getUserLoaded);
    this.entry$ = this.store.select(fromStore.getUserEntrypoint);
  }

  ngAfterViewInit(): void {
    this.loaded$
      .pipe(
        skipWhile((loaded: boolean) => loaded === false),
        switchMap((entrypoint: any) => this.entry$.pipe(map(entry => entry)))
      )
      .subscribe(entrypoint => {
        // console.log(entrypoint);
        entrypoint === '/login'
          ? this.router.navigate([''])
          : this.router.navigateByUrl(entrypoint);
      });
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
