describe("Notification", function() {
    var Notification = window.Notification;



    it('Should be an Object', function() {
        expect(Notification instanceof Object).to.equal(true);
    });
    it('Should be a function', function() {
        expect(typeof Notification).to.equal('function');
    });



    it('Permission Property', function() {
        expect(typeof Notification.permission).to.not.be.undefined;
        expect(typeof Notification.permission).to.equal('string');
    });
    it('RequestPermission method', function() {
        var permission = Notification.permission;
        var requestPermission = Notification.requestPermission();
        expect(typeof Notification.requestPermission).to.not.be.undefined;
        expect(typeof Notification.requestPermission).to.equal('function');
        expect(Notification.requestPermission() instanceof Promise).to.equal(true);
    });



    it('Instance creation', function() {
        // Test notification with no params.
        expect(function() {return new Notification}).to.throw();

        // Test notification with params which is not an object
        expect(function() {return new Notification('', '')}).to.throw();

        // If title is null/undefined - it should be displayed as null/undefined
        expect((new Notification(null)).title).to.equal('null');
        expect((new Notification(undefined)).title).to.equal('undefined');
    });

    it('Test dir param', function() {
        // Test incorrect dir option
        expect(function() {return new Notification('', {'dir': 'a'})}).to.throw();
        expect(function() {return new Notification('', {'dir': 'undefined'})}).to.throw();
        expect(function() {return new Notification('', {'dir': null})}).to.throw();
    });


});
