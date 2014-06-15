describe("LocationProvider", function() {

  describe("When geolocation is not supported by the browser", function() {
    it("getCurrentPosition should return a failed promise", function(done) {
      var locationProvider = helper.fakeLocationProvider2({simulateMissingGeolocation : true });//new App.LocationProvider();
      var promise = locationProvider.getCurrentPosition();
      
      promise.then(
        function() {
          expect(false).toBe(true);
          done('Expected promise to have been rejected');
        },
        function(result) {
          expect(true).toBe(true);
          done();
        },
        function() { done(); }
      );
    });
  });

  describe("When geolocation is supported by the browser", function() {
    beforeEach(function() {
      this.locationProvider = helper.fakeLocationProvider2();
    });

    it("getCurrentPosition should return a promise", function(done) {
      var promise = this.locationProvider.getCurrentPosition();

      promise.then(
        function(position) {
          expect(position).toEqual(geopositionStub);
        },
        function(error) {
          expect(false).toBe(true);
        }
      ).always(done);
    });

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

    it("should raise a didFailToUpdateLocation event on failure", function() {
      var spy = sinon.spy();
      this.locationProvider.on('didFailToUpdateLocation', spy);

      var error = {};
      this.locationProvider.onError(error);

      expect(spy.calledWith(error)).toBeTruthy();
    });
  });
});