import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as mainActions from '../actions/main.actions';
import { Router } from '@angular/router';

@Injectable()
export class MainEffects {
  constructor(private actions$: Actions, private router: Router) {}
}
