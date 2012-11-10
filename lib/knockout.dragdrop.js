ko.utils.extend(ko.bindingHandlers, {
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
