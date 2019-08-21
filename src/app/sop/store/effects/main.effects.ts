import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as mainActions from '../actions/main.actions';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services';
import { switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MainEffects {
  constructor(private actions$: Actions, private router: Router,
    private firestoreService: FirestoreService) { }

  @Effect()
  load_main_sop$ = this.actions$.pipe(
    ofType(mainActions.LOAD_MAIN_SOPS),
    switchMap(() => {
      return this.firestoreService.col$('/sops').pipe(
        map((sops: any) => new mainActions.LoadedMain(sops)),
        catchError(err => of(new mainActions.FailLoadingMain(err)))
      );
    }
    ));

  ///// DANGER! TO update each main category SOPS, use only once or twice. DANGER! /////
  @Effect({ dispatch: false })
  update_main_cat_load$ = this.actions$.pipe(
    ofType(mainActions.LOADED_MAIN_SOPS),
    take(1),
    map((action: any) => {
      const entities = action.payload;
      const ref = '/search/sop';
      const search = {
        items0_250: [],
        items250_500: [],
        items500_750: [],
        items750_1000: []
      };
      console.log(search)
      entities.forEach(entity => {
        entity.search.forEach(s => {
          console.log(s)
          if (search.items0_250.length < 250) { return search.items0_250.push(s); }
          if (search.items250_500.length < 250) { return search.items0_250.push(s); }
          if (search.items500_750.length < 250) { return search.items0_250.push(s); }
          if (search.items750_1000.length < 250) { return search.items0_250.push(s); }
          console.log('Oops something went wrong');
        });
      });
      console.log(search);
      return this.firestoreService.update('/search/sop', { search });
    }),
    catchError(err => of(err))
  );
}
