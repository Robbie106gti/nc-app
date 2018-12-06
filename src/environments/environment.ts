// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDB21DFI98in8MfOgbNUX6myz0R6wnmB0c',
    authDomain: 'nickels-catalog.firebaseapp.com',
    databaseURL: 'https://nickels-catalog.firebaseio.com',
    projectId: 'nickels-app',
    storageBucket: 'nickels-catalog.appspot.com',
    messagingSenderId: '311839445330'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
