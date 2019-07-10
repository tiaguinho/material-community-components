# Material Community Components
Angular Material components that are not implemented in official package.

[![npm version](https://badge.fury.io/js/material-community-components.svg)](https://badge.fury.io/js/material-community-components)
[![CircleCI](https://circleci.com/gh/tiaguinho/material-community-components/tree/master.svg?style=svg)](https://circleci.com/gh/tiaguinho/material-community-components/tree/master)
[![patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/temporin)

The idea of the [Material Community Components]() is to provide components that aren't available in the [Angular Material2](https://material.angular.io) yet.

All the components are created using just [Angular](https://angular.io), [Material 2](https://material.angular.io) and [CDK](https://material.angular.io/cdk).

Check out our [documentation & live demo](https://tiaguinho.github.io/material-community-components/)

## Components Status

All the components have the prefix `mcc` followed by the package name.

| Component    | Status    | package          |
| ------------ | --------- | ---------------- |
| Carousel | -         | ---              |
| Color Picker | Available | mcc-color-picker |
| File Manager | -         | ---              |
| Google Recaptcha | -         | ---              |
| Scrollspy    | Available | mcc-scrollspy    |
| Speed Dial   | Available | mcc-speed-dial   |
| Timer Picker | Available | mcc-timer-picker |

If you miss any component, please follow the [CONTRIBUTION GUIDELINE](https://github.com/tiaguinho/material-community-components/blob/master/CONTRIBUTING.md) to open an issue.

## Install

### step: 1

We use some components from the [Angular Material](https://material.angular.io/). To be able to use this component, you have to install the `@angular/animations`. If you follow all the steps in [Material Guide](https://material.angular.io/guide/getting-started), you already have this step done.

```bash
    npm install --save @angular/animations
```

Note: [@angular/animations](https://angular.io/guide/animations) uses the WebAnimation API that isn't supported by all browsers yet. If you want to support Material component animations in these browsers, you'll have to include a [polyfill](https://github.com/web-animations/web-animations-js).

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

If you don't want to add another dependency to your project, you can use the [NoopAnimationsModule](https://angular.io/api/platform-browser/animations/NoopAnimationsModule).

```typescript
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [NoopAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

### step: 2

Install material community components package:

```bash
    npm install material-community-components
```

or

```bash
  yarn add material-community-components
```

## Theming

To use the same theme of Angular Material add the following code to your ```style.scss```.

```scss
@import '~@angular/material/theming';
@import '~material-community-components/theming';

@include mat-core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$demo-primary: mat-palette($mat-green);
$demo-accent: mat-palette($mat-pink, A200, A100, A400);

// The warn palette is optional (defaults to red).
$demo-warn: mat-palette($mat-red);

// Create the theme object (a Sass map containing all of the palettes).
$demo-theme: mat-light-theme($demo-primary, $demo-accent, $demo-warn);

// build angular material theme
@include angular-material-theme($demo-theme);

// pass angular material theme to material community components
@include mcc-theme($demo-theme);
```
***this is only available for the ```timer-picker``` component***

## How to use

For more examples, you can see our [app-demo](https://github.com/tiaguinho/material-community-components/blob/master/src/demo-app/app) folder or read the full [documentation](https://tiaguinho.github.io/material-community-components)

## License

[The MIT License (MIT) Copyright (c) 2018](http://opensource.org/licenses/MIT)

## Sponsors

[![alt text](https://github.com/tiaguinho/material-community-components/raw/master/images/sponsor-egoi.png 'E-goi')](https://www.e-goi.com)
