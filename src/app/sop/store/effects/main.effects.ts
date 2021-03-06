import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as mainActions from '../actions/main.actions';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { sortAlfabet } from 'src/app/common/sort';

@Injectable()
export class MainEffects {
  constructor(private actions$: Actions, private router: Router,
    private firestoreService: FirestoreService) {}

  @Effect()
  load_main_sop$ = this.actions$.pipe(
    ofType(mainActions.LOAD_MAIN_SOPS),
    switchMap(() => {
      return this.firestoreService.col$('/sops').pipe(map((sops: any) => {
        let entities = sops.map(sop => sop = { ...sop, 'sub': 'main'});
        entities = sortAlfabet(entities);
        return new mainActions.LoadedMain(entities);
      }),
      catchError(err => of(new mainActions.FailLoadingMain(err))));
    }
    ));
}
