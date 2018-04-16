# MccColorPickerOrigin

This directive goes in the element (input, textarea or select) that will be connected to the color picker.

```html
<mat-form-field>
  <input matInput mccColorPickerOrigin #trigger="mccColorPickerOrigin" />
</mat-form-field>
```

## API

### Outputs

| Name            | Description                  |
| --------------- | ---------------------------- |
| changes: string | Emit changes from the origin |

# MccConnectedColorPicker

This directive is used in the color picker that you want's to connect.

```html
<mcc-color-picker mccConnectedColorPicker
                  [mccConnectedColorPickerOrigin]="trigger">
</mcc-color-picker>
```

## API

### Inputs

| Name                                                | Description                              |
| --------------------------------------------------- | ---------------------------------------- |
| mccConnectedColorPickerOrigin: MccColorPickerOrigin | Element that color picker has to connect |
