// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAHvbb255mGtHt-ocHiEEiV9gy4ffvglr4",
    authDomain: "phil-fitness-tracker.firebaseapp.com",
    databaseURL: "https://phil-fitness-tracker.firebaseio.com",
    projectId: "phil-fitness-tracker",
    storageBucket: "phil-fitness-tracker.appspot.com",
    messagingSenderId: "727332530322"
  }
};
