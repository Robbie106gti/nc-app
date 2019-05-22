import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as mainActions from '../actions/main.actions';
import { Router } from '@angular/router';
import { FirestoreService } from '../../../services';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { sortAlfabet } from '../../../common/sort';

@Injectable()
export class MainEffects {
  constructor(private actions$: Actions, private router: Router,
    private firestoreService: FirestoreService) {}

  @Effect()
  load_main_catalog$ = this.actions$.pipe(
    ofType(mainActions.LOAD_MAIN_CATALOG),
    switchMap(() => {
      return this.firestoreService.col$('/categories').pipe(map((cats: any) => {
        console.log(cats);
        let entities = cats.map(cat => cat = { ...cat, 'sub': 'main'});
        entities = sortAlfabet(entities);
        return new mainActions.LoadedMainCatalog(entities);
      }),
      catchError(err => of(new mainActions.FailLoadingMainCatalog(err))));
    }
    ));
}
