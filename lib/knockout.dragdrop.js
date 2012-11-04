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

            ko.utils.registerEventHandler(element, 'dragstart', function (e) {
                if (effect) {
                    e.dataTransfer.effectAllowed = effect;
                }

                if (dragStart) {
                    dragStart(zone, ko.dataFor(element), e);
                }
            });

            ko.utils.registerEventHandler(element, 'dragend', function (e) {
                if (dragEnd) {
                    dragEnd(zone, ko.dataFor(element), e);
                }
            });
        }
    }
});
