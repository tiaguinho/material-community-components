# MatColorPicker class
This is the main class of the component.

## API

### Inputs
| Name | Description |
| --- | --- |
| usedColorLabel: string | Change the label of the used colors collection |
| usedColorStart: string[] | Set initial value for used colors collection |
| hideEmpty: boolean | Hide all empty slots of the default collection |
| hideHexForms: boolean | Hide the hexadecimal colors forms located below the color picker selector |
| selectedColor: string | Define initially selected color |
| isOpen: boolean | Define if panel will initiate open |
| hideButtons: boolean | Hide the buttons (confirm/cancel) |
| btnCancel: string | Will replace the default text(```Cancel```) in cancel button |
| btnConfirm: string | Will replace the default text(```Confirm```) in confirm button |

### Outputs
| Name | Description |
| --- | --- |
| change: EventEmitter | Event emitted when the color changed |
| selected: EventEmitter | Event emitted when the color is selected |
| clickOut: EventEmitter | Event emitted when is user clicks outside of the component |

## Directives

Using the ```MatColorPickerOrigin```and ```MatConnectedColorPicker```, you also can connect the color picker with any input, textarea or select element.

* [MatColorPickerOriginDirective](https://github.com/tiaguinho/mat-color-picker/wiki/MatColorPickerDirectives)
* [MatConnectedColorPickerDirective](https://github.com/tiaguinho/mat-color-picker/wiki/MatColorPickerDirectives)
