# MatColorPicker

<span class="badge-npmversion">[![npm version](https://badge.fury.io/js/mat-color-picker.svg)](https://badge.fury.io/js/mat-color-picker)</span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/mat-color-picker" title="View this project on NPM"><img src="https://img.shields.io/badge/downloads-450%2Fmonth-brightgreen.svg" alt="NPM downloads" /></a></span>

Small on size, big on features! MatColorPicker is created with Angular Material and CDK.

![alt text](https://github.com/tiaguinho/mat-color-picker/raw/master/images/screenshot-1.png "Screenshot")

## Install

### step: 1
We use some components from Material. To be able to use this component you have to install ```@angular/animations```. If you follow all the steps on [Material Guide](https://material.angular.io/guide/getting-started), you already have this step done.

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

Install the component

```bash
    npm install mat-color-picker
```

### step: 3

Import the component in your module.

```typescript
    import { MatColorPickerModule } from 'mat-color-picker';

@NgModule({
  imports: [
    ...
    MatColorPickerModule
    ...
  ],
  ...
})
```
## How to use

```html
    <mat-color-picker></mat-color-picker>
```

For more example you can our [app-demo](https://github.com/tiaguinho/mat-color-picker/blob/master/demo-app) folder or read the full [documentation](https://github.com/tiaguinho/mat-color-picker/wiki)

## License

[The MIT License (MIT) Copyright (c) 2018](http://opensource.org/licenses/MIT) 

## Sponsors

![alt text](https://github.com/tiaguinho/mat-color-picker/raw/master/images/sponsor-egoi.png "E-goi")
