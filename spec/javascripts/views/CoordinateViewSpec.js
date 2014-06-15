describe("CoordinateView", function() {

  describe("Initialization", function() {
    beforeEach(function() {
      this.locationProvider = new helper.fakeLocationProvider2();
      this.geocodingProvider = new helper.fakeGeocoder();
    });

    it("should raise an exception if a LocationProvider is not supplied", function() {
      var opts = { geocodingProvider: this.geocodingProvider };
      var constructorFn = function() { new App.CoordinateView(opts); };

      expect(constructorFn).toThrow();
    });

    it("should raise an exception if a GeocodingProvider is not supplied", function() {
      var opts = { locationProvider: this.locationProvider };
      var constructorFn = function() { new App.CoordinateView(opts); };

      expect(constructorFn).toThrow();
    });
  });

  describe("Before location is acquired", function() {
    it("should render a gps status field", function() {
      this.locationProvider = helper.fakeLocationProvider3();

      this.coodinateView = new App.CoordinateView({
        locationProvider: this.locationProvider,
        geocodingProvider: helper.fakeGeocoder()
      });
      
      var el = this.coodinateView.render().$el;
      expect(el).toContainElement('span#gps-status');
    });
  });

  describe("When geolocation and geocoding succeeds", function() {
    beforeEach(function(){ 
      this.locationProvider = helper.fakeLocationProvider3();
      this.geocodingProvider = helper.fakeGeocoder2();
  
      this.coordView = new App.CoordinateView({
        locationProvider: this.locationProvider,
        geocodingProvider: this.geocodingProvider
      });
    });

    it("should render the street and suburb", function(done) {
      this.locationProvider.deferred.resolve(geopositionStub);
      this.geocodingProvider.deferred.resolve(addressStub);
      var $el = this.coordView.render().$el;

      expect($el.find("#geocoded-address").text()).toBe("Old South Head Road, North Bondi");
      done();
    });

    it("should fire a didUpdateLocation event", function(done) {
      var spy = sinon.spy(this.coordView, "notify");
      this.coordView.render();
      this.locationProvider.deferred.resolve(geopositionStub);
      this.geocodingProvider.deferred.resolve(addressStub);

      expect(spy.calledWith(locationStub)).toBe(true);
      done();
    });
  });

  describe("When geolocation succeeds but geocoding fails", function() {
    beforeEach(function(){ 
      this.locationProvider = helper.fakeLocationProvider3();
      this.geocodingProvider = helper.fakeGeocoder2();
  
      this.coordView = new App.CoordinateView({
        locationProvider: this.locationProvider,
        geocodingProvider: this.geocodingProvider
      });
    });

    it("should render 'Location Acquired'", function(done) {
      this.locationProvider.deferred.resolve(geopositionStub);
      this.geocodingProvider.deferred.reject();
      
      var $el = this.coordView.render().$el;

      var message = $el.find('span#gps-status');
      expect(message).toContainText('Location acquired.');
      done();
    });

    it("should fire a didUpdateLocation event", function(done) { 
      var spy = sinon.spy();

      var expectedLocation = {
        latitude: latlngStub.latitude,
        longitude: latlngStub.longitude,
        address: ""
      };

      this.locationProvider.deferred.resolve(geopositionStub);
      this.geocodingProvider.deferred.reject();

      this.coordView.on('didUpdateLocation', spy);
      this.coordView.render();

      expect(spy).toHaveBeenCalledWith(expectedLocation);
      done();
    });
  });
});