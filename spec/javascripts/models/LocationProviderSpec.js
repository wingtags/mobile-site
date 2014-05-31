describe("LocationProvider", function() {

  beforeEach(function() {
    this.locationProvider = new App.LocationProvider();
  });

  describe("When geolocation is not available", function() {
    beforeEach(function() {
      this.locationProvider.isAvailable = function() { return false; }
    });

    it("should raise an error on getCurrentPosition()", function() {
      var spy = sinon.spy();
      this.locationProvider.on('didFailToUpdateLocation', spy);

      this.locationProvider.getCurrentPosition();

      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe("startUpdatingLocation", function() {

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