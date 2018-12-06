import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions) {}
}
