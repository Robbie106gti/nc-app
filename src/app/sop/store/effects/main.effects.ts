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
  @Effect({ dispatch: false })
  update_main_cat_load$ = this.actions$.pipe(
    ofType(mainActions.LOADED_MAIN_SOPS),
    take(1),
    map((action: any) => {
      const entities = action.payload;
      const ref = '/search/sop';
      entities.forEach(async entity => {
        const catinSearch = fetch(root + 'catalog/api/public/index.php/search/s/' + entity.id)
        .then((resp) => resp.json())
        .then(resultcat => {
          // console.log(resultcat.bodyUsed)
        if (resultcat === false) {
          console.log('not found in search', resultcat, entity);
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
        return resultcat;
        });
        entity.search.forEach(async s => {
          const inSearch = fetch(root + 'catalog/api/public/index.php/search/s/' + s.id)
          .then((resp) => resp.json())
          .then(result => {
          if (!result) {
            console.log('not found in search', result);
            addSearch(s);
          }
          return result;
          });
        });
      });
      return of(null);
    }),
    catchError(err => of(err))
  );
}

async function addSearch(s) {
  const url = root + 'catalog/api/public/index.php/search/add';
  const data = new FormData();
    data.append('id', s.id);
    data.append('idCat', s.idCat);
    data.append('title', s.title);
    // tslint:disable-next-line: max-line-length
    data.append('image', s.image);
    data.append('content', s.content);
    data.append('type', 'sop');
    data.append('sub', s.sub);
    data.append('link', s.link);
  const result = await fetch(url, {
    method: 'post',
    body: data
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(err) {
    console.log(err);
    // Error :(
      throw(err);
  });
  return result;
}
