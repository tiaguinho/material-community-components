## MccColorPicker module

When import the `MccColorPickerModule`, you can provide a configuration for the empy value.

```typescript
  @NgModule({
    ...
    imports: [
      MccColorPickerModule.forRoot({
        empty_color: 'transparent'
      })
    ]
    ...
  })
```

The default value is `none`, but you can set anything you want.

## Components

For the `@Input` and `@Output` of the component, check the link below.

* [MccColorPickerComponent](https://github.com/tiaguinho/material-community-components/docs/COMPONENT)

## Directives

Using the `MccColorPickerOrigin`and `MccConnectedColorPicker`, you also can connect the color picker with any input, textarea or select element.

* [MccColorPickerOriginDirective](https://github.com/tiaguinho/material-community-components/docs/DIRECTIVES)
* [MccConnectedColorPickerDirective](https://github.com/tiaguinho/material-community-components/docs/DIRECTIVES)
