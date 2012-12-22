## Knockout.js Drag and Drop binding

Drag and drop is done using drop and drag zones. Each zone has a name. In the most simple case all you need is a drag zone and one or more drop zones. For example:

    <div data-bind="dropzone: 'myzone'">...</div>


    <div data-bind="dragzone: 'myzone'">...</div>

## Drop zones

Of course you will probably want to receive an event when a drop has occured so you use the advanced drop zone options:

    <div data-bind="dropzone: { name: 'myzone', drop: onDrop }">...</div>

The `name` property gives the dropzone a name. The `drop` callback will be called when a drop is complete. Besides `drop` you can also set up callbacks for `dragenter` and `dragleave` which will be called when a dragged object enters the drag zone and leaves the drag zone. You can use these callbacks to insert and remove marker elements, for example to indicate where a dragged object will be inserted if it is dropped.

The `dragenter` and `dragleave` callbacks will be passed the Knockout.js data binding for the dragged element and the drag and drop zone name. The `drop` callback will be passed the data binding for both the dragged element and the element it is dropped on, as well as the drag and drop zone name.

## Drag zones

The drag zone binding also has a set of advanced options that lets you receive callbacks `dragstart` when the drag starts and `dragend` when the drag ends. The `dragend` callback is not called when the dragged elements is succesfulyy dropped. In this case the `drop` callback on the drop zone is called.

    <div data-bind="dragzone: { name: 'myzone', dragstart: onStart, dragend: onEnd }">...</div>

You can use these two callbacks to add special styling to the element that is being dragged.
    
## Data

The drag and drop binding will attempt to use the data binding on the element it is present on, such as a `text` or a `value` binding, but if there is no suitable binding you can also use the `data` property on both the drag and drop zone to bind to an object or observable:

    <div data-bind="dragzone: { name: 'myzone', data: myObservable }">...</div>

    <div data-bind="dropzone: { name: 'myzone', data: myObject, drop: onDrop }">...</div>

So when the `myzone` drag zone is dropped on the `myzone` dropzone, in the above example, the `onDrop` function will be called with `myObservable` and `myObject`.

## Effects

## Drag Feedback
