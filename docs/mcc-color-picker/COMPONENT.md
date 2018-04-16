# MccColorPicker component

This is the main class of the component.

```html
  <!--  simple usage -->
  <mcc-color-picker></mcc-color-picker>
```

For more examples, see our [live demo](https://stackblitz.com/edit/material-community-components-demo).

## API

### Inputs

| Name                             | Description                                                |
| -------------------------------- | ---------------------------------------------------------- |
| usedColorLabel: string           | Change the label of the used colors collection             |
| usedColorStart: string[]         | Set initial value for used colors collection               |
| hideEmpty: boolean               | Hide all empty slots of the default collection             |
| hideTransparent: boolean         | Hide transparent option of UsedColors                      |
| hideUsedColors: boolean          | Hide UsedColors default collection                         |
| hideButtons: boolean             | Hide the buttons (confirm/cancel)                          |
| hideColorPickerSelector: boolean | Hide the color picker selector                             |
| selectedColor: string            | Define initially selected color                            |
| isOpen: boolean                  | Define if panel will initiate open                         |
| overlay: boolean                 | Define if panel will be show inside overlay                |
| usedSizeColors: number           | Set the size of used colors collection                     |
| btnCancel: string                | Will replace the default text(`Cancel`) in cancel button   |
| btnConfirm: string               | Will replace the default text(`Confirm`) in confirm button |

### Outputs

| Name                   | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| change: EventEmitter   | Event emitted when the color changed                       |
| selected: EventEmitter | Event emitted when the color is selected                   |
| clickOut: EventEmitter | Event emitted when is user clicks outside of the component |

## Directives

Using the `MccColorPickerOrigin`and `MccConnectedColorPicker`, you also can connect the color picker with any input, textarea or select element.

* [MccColorPickerOriginDirective](https://github.com/tiaguinho/material-community-components/docs/DIRECTIVES)
* [MccConnectedColorPickerDirective](https://github.com/tiaguinho/material-community-components/docs/DIRECTIVES)
