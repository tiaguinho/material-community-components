# MatColorPicker class
This is the main class of the component.

## API

### Inputs
| Name | Description |
| --- | --- |
| usedColorLabel: string | Change the label of the used colors collection |
| usedColorStart: string[] | Set initial value for used colors collection |
| hideEmpty: boolean | Hide all empty slots of the default collection |
| selectedColor: string | Define initially selected color |
| isOpen: boolean | Define if panel will initiate open |
| hideButtons: boolean | Hide the buttons (confirm/cancel) |
| btnCancel: string | Will replace the default text(```Cancel```) in cancel button |
| btnConfirm: string | Will replace the default text(```Confirm```) in confirm button |

### Outputs
| Name | Description |
| --- | --- |
| change: EventEmitter | Event that is emitted when the color is selected |
| clickOut: EventEmitter | Event emitted when is user clicks outside of the component |
