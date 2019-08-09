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
      return this.firestoreService.col$('/categories').pipe(map((cats: any) => new mainActions.LoadedMainCatalog(cats)),
      catchError(err => of(new mainActions.FailLoadingMainCatalog(err))));
    }
    ));

    ///// DANGER! TO update each main category CATALOG, use only once or twice. DANGER! /////
    /*     @Effect({dispatch: false})
        update_main_cat_load$ = this.actions$.pipe(
          ofType(mainActions.LOADED_MAIN_CATALOG),
          take(1),
          map((action: any) => {
            console.log('Hello');
            const entities = action.payload;
            const ref = '/???/';
            entities.forEach(entity => {
            console.log(entity.link.includes('undefined'));
              const update = entity.link.includes('undefined') ? true : false;
              const data: any = {
                link: makelink(entity.title),
                id: entity.id,
                type: 'sop',
                sub: 'main',
                updated: true
              };
    
              if (update === true) {
                console.log({update, data});
    
                return this.firestoreService.update(ref + entity.id, data);
              }
            });
            return of(null);
          }),
          catchError(err => of(err))
          ); */
}
