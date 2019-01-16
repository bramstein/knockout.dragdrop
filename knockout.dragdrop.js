(function() {
    var zones = {};

    function getSource(zone) {
        return zones[zone] && zones[zone].source || null;
    }

    function setSource(zone, source) {
        if (!zones[zone]) {
            zones[zone] = {};
        }
        zones[zone].source = source;
    }

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
                    var source = getSource(zone);

                    // If there is a source element (i.e. the zones match) and the
                    // source is not the target element then call the dragenter
                    // callback (if there is one.)
                    if (source !== null && source !== element) {
                        if (dragEnter) {
                            return dragEnter.call(ko.dataFor(element), ko.dataFor(element), event, zone);
                        } else {
                            // There is no callback that tells us this is not a valid
                            // dropzone, so let's register as one.
                            return false;
                        }
                    }
                    return true;
                });

                ko.utils.registerEventHandler(element, 'dragleave', function (event) {
                    if (dragLeave) {
                        return dragLeave.call(ko.dataFor(element), ko.dataFor(element), event, zone);
                    }
                    return false;
                });

                ko.utils.registerEventHandler(element, 'dragover', function (event) {
                    var source = getSource(zone);

                    return !(source !== null && source !== element);
                });

                ko.utils.registerEventHandler(element, 'drop', function (event) {
                    var source = getSource(zone);

                    if (drop) {
                        // Call drop if there is a callback function. If there is a
                        // source we pass the source and target data to the callback.
                        // TODO: What about external drag and drop, and things being
                        // dropped onto dropzones that do not match?
                        drop.call(ko.dataFor(element), source && ko.dataFor(source) || null, ko.dataFor(element), event, zone);
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

                // TODO: Should this set the draggable attribute if it isn't there?

                ko.utils.registerEventHandler(element, 'dragstart', function (event) {
                    setSource(zone, element);
                    event.originalEvent.dataTransfer.setData('text','');
                    if (effect) {
                        event.dataTransfer.effectAllowed = effect;
                    }

                    if (dragStart) {
                        dragStart.call(ko.dataFor(element), ko.dataFor(element), event, zone);
                    }
                });

                ko.utils.registerEventHandler(element, 'dragend', function (event) {
                    if (dragEnd) {
                        // TODO: Do something useful with drataTransfer.dropEffect === none?
                        dragEnd.call(ko.dataFor(element), ko.dataFor(element), event, zone);
                    }
                    setSource(zone, null);
                });
            }
        }
    });
}());