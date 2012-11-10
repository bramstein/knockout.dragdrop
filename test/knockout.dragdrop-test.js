
function createEvent(type) {
    var event = document.createEvent('DragEvent');
    event.initDragEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null, {});
    return event;
}

describe('knockout.dragdrop', function () {
    describe('drop', function () {
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

        it('supports dragStart event', function (done) {
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

        it('supports dragEnd event', function (done) {
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
