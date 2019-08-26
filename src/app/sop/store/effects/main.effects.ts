import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as mainActions from '../actions/main.actions';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services';
import { switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

const root = window.location.hostname === 'localhost' ? 'http://localhost/' : 'https://webquoin.com/';
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
  /*   @Effect({ dispatch: false })
    update_main_cat_load$ = this.actions$.pipe(
      ofType(mainActions.LOADED_MAIN_SOPS),
      take(1),
      map((action: any) => {
        const entities = action.payload;
        const ref = '/search/sop';
        entities.forEach(async entity => {
          const catinSearch = await searchId(entity.id);
          const search = entity.search ? entity.search : [];
          if (catinSearch === false) {
            console.log('not found in search', catinSearch, entity);
            addSearch({
              title: entity.title,
              id: entity.id,
              idCat: entity.id,
              link: entity.link,
              image: entity.image,
              content: '',
              sub: entity.sub
            });
          }
          search.forEach(async s => {
            const inSearch = await searchId(s.id);
            if (inSearch === false) {
              console.log('not found in search', inSearch);
              addSearch(s);
            }
          });
        });
        return of(null);
      }),
      catchError(err => of(err))
    ); */
}

async function addSearch(s) {
  const url = root + 'catalog/api/public/index.php/search/add';
  const data = new FormData();
  data.append('id', s.id);
  data.append('idCat', s.idCat);
  data.append('title', s.title);
  data.append('image', s.image);
  data.append('content', s.content);
  data.append('type', 'sop');
  data.append('sub', s.sub);
  data.append('link', s.link);
  let result = {};
  await fetch(url, {
    method: 'post',
    body: data
  })
    .then((response) => result = response.json())
    .catch(function (err) {
      console.log(err);
      // Error :(
      throw (err);
    });
  return result;
}

async function searchId(id) {
  const url = root + 'catalog/api/public/index.php/search/s/';
  let result = {};
  await fetch(url + id, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'GET'
  })
    .then((response) => result = response.json())
    .catch(err => { throw (err); });
  return result;
}
