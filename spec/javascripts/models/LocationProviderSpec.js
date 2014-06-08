describe("LocationProvider", function() {

  beforeEach(function() {
    this.locationProvider = new App.LocationProvider();
  });

  describe("When geolocation is not supported by the browser", function() {
    beforeEach(function() {
      helper.fakeLocationProvider({ simulateMissingGeolocation : true});
    });

    afterEach(function() {
      helper.restoreLocationProvider();
    });

    //it("should raise an error on getCurrentPosition()", function() {
    //  var spy = sinon.spy();
    //  this.locationProvider.on('didFailToUpdateLocation', spy);
//
    //  this.locationProvider.getCurrentPosition();
//
    //  expect(spy.calledOnce).toBeTruthy();
    //});

    it("getCurrentPosition should return a failed promise", function() {
      var locationProvider = new App.LocationProvider();
      var promise = locationProvider.getCurrentPosition();
      var out = false;
      promise.fail(function() { out = true });
      expect(out).toBe(true);
    });
  });

  describe("When geolocation is supported by the browser", function() {
    beforeEach(function() {
      helper.fakeLocationProvider({ simulateMissingGeolocation : false });
    });

    afterEach(function() {
      helper.restoreLocationProvider();
    });

    it("should return a promise", function() {
      var locationProvider = new App.LocationProvider();
      var promise = locationProvider.getCurrentPosition();
      var position;

      promise.done(function(arg) { position = arg; });

      expect(_.isEqual(position, geopositionStub)).toBeTruthy();
    });
  });

  describe("getCurrentPosition", function() {
    it("should return a promise", function() {
      this.locationProvider.isAvailable = function() { return true; }
      var returnObj = this.locationProvider.getCurrentPosition();
      expect(returnObj).toExist();
    });
  });

  describe("on success", function() {
    it("should raise a didUpdateLocation event", function() {
      var spy = sinon.spy();
      this.locationProvider.on('didUpdateLocation', spy);
  
      var position = {};
      this.locationProvider.onSuccess(position);
  
      expect(spy.calledOnce).toBeTruthy();
    });

    it("should set the lastLocation attribute", function() {
      var position = {};
      this.locationProvider.onSuccess(position);

      expect(this.locationProvider.get('lastLocation')).toExist();
    });
  });

  describe("on failure", function() {
    it("should raise a didFailToUpdateLocation event", function() {
      var spy = sinon.spy();
      this.locationProvider.on('didFailToUpdateLocation', spy);

      var error = {};
      this.locationProvider.onError(error);

      expect(spy.calledWith(error)).toBeTruthy();
    });
  });
});