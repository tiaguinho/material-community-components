# MatColorPicker

Simple color picker created with Angular Material.

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

## Sponsors

![alt text](https://github.com/tiaguinho/mat-color-picker/raw/master/images/sponsor-egoi.png "E-goi")
