# MatColorPickerOrigin

This directive goes in the element (input, textarea or select) that will be connected to the color picker.

```html
<mat-form-field>
  <input matInput matColorPickerOrigin #trigger="matColorPickerOrigin" />
</mat-form-field>
```


# MatConnectedColorPicker

This directive is used in the color picker that you want's to connect.

```html
<mat-color-picker matConnectedColorPicker
                  [matConnectedColorPickerOrigin]="trigger">
</mat-color-picker>
````
## API

### Inputs
| Name | Description |
| --- | --- |
| matConnectedColorPickerOrigin: MatColorPickerOrigin | Element that color picker has to connect |