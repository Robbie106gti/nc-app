import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as uiActions from '../actions/ui.actions';
import { Router } from '@angular/router';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions, private router: Router) {}
}
