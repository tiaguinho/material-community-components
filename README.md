# Material Community Components   <span class="badge-npmversion">[![npm version](https://badge.fury.io/js/material-community-components.svg)](https://badge.fury.io/js/material-community-components)</span>

Small on size, big on features!

The idea of Material Community Components is to provide components that aren't present in Angular Material.

All the components are created using just Angular, Material and CDK.

## Components Status

All the components have the prefix ```mcc``` followed by the package name.

| Component    | Status         | package |
| ------------ | -------------- | ---- |
| Color Picker | Available      | mcc-color-picker  |
| Date Picker  | -              | ---  |
| File Manager | -              | ---  |
| Button Group | -              | ---  |
| Timer Picker | Available      | mcc-timer-picker  |

If you are missing some components, please follow the [CONTRIBUTION GUIDELINE](https://github.com/tiaguinho/material-community-components/blob/master/CONTRIBUTING) to open a issue.

## Install

### step: 1

We use some components from Material. To be able to use this component you have to install `@angular/animations`. If you follow all the steps on [Material Guide](https://material.angular.io/guide/getting-started), you already have this step done.

```bash
    npm install --save @angular/animations
```

Note: @angular/animations uses the WebAnimation API that isn't supported by all browsers yet. If you want to support Material component animations in these browsers, you'll have to include a [polyfill](https://github.com/web-animations/web-animations-js).

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

If you don't want to add another dependency to your project, you can use the NoopAnimationsModule.

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

## How to use

For more example you can see our [app-demo](https://github.com/tiaguinho/material-community-components/blob/master/src/demo-app) folder or read the full [documentation](https://github.com/tiaguinho/material-community-components/wiki)

## License

[The MIT License (MIT) Copyright (c) 2018](http://opensource.org/licenses/MIT)

## Sponsors

![alt text](https://github.com/tiaguinho/material-community-components/raw/master/images/sponsor-egoi.png 'E-goi')
