# Startcoffee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

`further instructions on how to implement SEO and CSS`

Brew app info

- create generics.js and place (register, login, modal and forgot password section code inside, change password stays within angular)
- header and footer will be controlled by generics and appended to the DOM once generics loads they will be loaded on each page on refresh apart from inner angular navigation pages, angular protected routes will be attached to the header section and reload will not occur once an angular route is activated, only for un-protected routes will the backend serve the entire index.html (css, scripts, angular bundle included) and reload the whole app
- generics.js will be written in ES6 and Typescript and make them reusable for future applications, it will be tested against it's own localhost (functionalities, css styling of generics components etc.). Consider writing unit tests when you find time for that
- about.html, info.html home.html will all serve the html, styles.css, generics.js and angular.js (already mentioned above)
- reload should occur for non angular pages because of SEO.
- for further info see picture on mobile phone (deleted cannot find it)

Loading order should be css(async), generics (sync), angular (sync)

TECHNICAL

- make use of the custom window.dispatchEvent as on the banking project
