
function createEvent(type) {
    var event = document.createEvent('DragEvent');
    event.initDragEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null, {});
    return event;
}

describe('knockout.dragdrop', function () {
    describe('drop', function () {
        it('throws an exception when the dropzone is incorrectly configured', function () {
            var el = document.getElementById('bad-drop');
            expect(function () {
                ko.applyBindings({}, el);
            }).to.throwException();
        });

        it('supports simple configuration', function () {
            var el = document.getElementById('simple-drop');
            expect(function () {
                ko.applyBindings({}, el);
            }).to.not.throwException();
        });

        it('supports dragEnter callback', function (done) {
            var el = document.getElementById('enter-dragdrop'),
                drop = el.firstChild,
                drag = el.lastChild;

            ko.applyBindings({
                dragEnter: function (data, event, zone) {
                    expect(zone).to.eql('test');
                    expect(event).to.not.eql(null);
                    done();
                }
            }, el);
            drag.dispatchEvent(createEvent('dragstart'));
            drop.dispatchEvent(createEvent('dragenter'));
            drag.dispatchEvent(createEvent('dragend'));
        });

        it('supports dragLeave callback', function (done) {
            var el = document.getElementById('leave-dragdrop'),
                drop = el.firstChild,
                drag = el.lastChild;

            ko.applyBindings({
                dragLeave: function (data, event, zone) {
                    expect(zone).to.eql('test');
                    expect(event).to.not.eql(null);
                    done();
                }
            }, el);

            drag.dispatchEvent(createEvent('dragstart'));
            drop.dispatchEvent(createEvent('dragenter'));
            drop.dispatchEvent(createEvent('dragleave'));
            drag.dispatchEvent(createEvent('dragend'));
        });
    });

    describe('drag', function () {
        it('throws an exception when the dragzone is incorrectly configured', function () {
            var el = document.getElementById('bad-drag');
            expect(function () {
                ko.applyBindings({}, el);
            }).to.throwException();
        });

        it('supports simple configuration', function () {
            var el = document.getElementById('simple-drag');
            expect(function () {
                ko.applyBindings({}, el);
            }).to.not.throwException();
        });

        it('supports dragStart callback', function (done) {
            var el = document.getElementById('start-drag');
            ko.applyBindings({
                dragStart: function (data, event, zone) {
                    expect(zone).to.eql('test');
                    expect(event).to.not.eql(null);
                    done();
                }
            }, el);
            el.dispatchEvent(createEvent('dragstart'));
        });

        it('supports dragEnd callback', function (done) {
            var el = document.getElementById('end-drag');
            ko.applyBindings({
                dragEnd: function (data, event, zone) {
                    expect(zone).to.eql('test');
                    expect(event).to.not.eql(null);
                    done();
                }
            }, el);

            el.dispatchEvent(createEvent('dragstart'));
            el.dispatchEvent(createEvent('dragend'));
        });

        it('supports setting the effectAllowed property', function (done) {
            var el = document.getElementById('effect-drag');
            ko.applyBindings({
                dragStart: function (data, event, zone) {
                    expect(zone).to.eql('test');
                    expect(event.dataTransfer.effectAllowed).to.eql('move');
                    done();
                }
            }, el);

            el.dispatchEvent(createEvent('dragstart'));
        });
    });
});
