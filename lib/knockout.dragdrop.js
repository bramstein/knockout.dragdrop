ko.utils.extend(ko.bindingHandlers, {
    dropzone: {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                effect = null,
                dragEnter = null,
                dragLeave = null,
                drop = null,
                zone = null;

            if (typeof value === 'string') {
                zone = value;
            } else {
                if (!value.name) {
                    throw new Error('A dropzone must have a name.');
                } else {
                    zone = value.name;
                }

                if (value.effect) {
                    effect = value.effect;
                }

                if (value.dragEnter) {
                    dragEnter = value.dragEnter;
                }

                if (value.dragLeave) {
                    dragLeave = value.dragLeave;
                }

                if (value.drop) {
                    drop = value.drop;
                }
            }

            ko.utils.registerEventHandler(element, 'dragenter', function (event) {
                return true;
            });

            ko.utils.registerEventHandler(element, 'dragleave', function (event) {
                return false;
            });

            ko.utils.registerEventHandler(element, 'dragover', function (event) {
                return true;
            });

            ko.utils.registerEventHandler(element, 'drop', function (event) {
                if (drop) {
                    drop(ko.dataFor(element), event, zone);
                }
                return false;
            });
        }
    },
    dragzone: {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                effect = null,
                dragStart = null,
                dragEnd = null,
                zone = null;

            if (typeof value === 'string') {
                zone = value;
            } else {
               if (!value.name) {
                   throw new Error('A dragzone must have a name.');
               } else {
                   zone = value.name;
               }

               if (value.effect) {
                   effect = value.effect;
               }

               if (value.dragStart) {
                   dragStart = value.dragStart;
               }

               if (value.dragEnd) {
                   dragEnd = value.dragEnd;
               }
            }

            ko.utils.registerEventHandler(element, 'dragstart', function (event) {
                if (effect) {
                    event.dataTransfer.effectAllowed = effect;
                }

                if (dragStart) {
                    dragStart(ko.dataFor(element), event, zone);
                }
            });

            ko.utils.registerEventHandler(element, 'dragend', function (event) {
                if (dragEnd) {
                    dragEnd(ko.dataFor(element), event, zone);
                }
            });
        }
    }
});
