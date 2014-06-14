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

    xit("should raise an exception if a GeocodingProvider is not supplied", function() {
      var opts = { locationProvider: this.locationProvider };
      var constructorFn = function() { new App.CoordinateView(opts); };

      expect(constructorFn).toThrow();
    });
  });

  describe("When geolocation and geocoding succeeds", function() {
    beforeEach(function() {
      var opts = {
        locationProvider: new helper.fakeLocationProvider2(),
        geocodingProvider: new helper.fakeGeocoder()
      }
      this.coordView = new App.CoordinateView(opts);
    });

    it("should render the street and suburb", function(done) {
      var $el = this.coordView.render().$el;
      expect($el.find("#geocoded-address").text()).toBe("Old South Head Road, North Bondi");
      done();
    });

    it("should fire a didUpdateLocation event", function() {
      var spy = sinon.spy(this.coordView, "notify");
      this.coordView.render();
      expect(spy.calledWith(locationStub)).toBe(true);
    });
  });

  describe("When geolocation succeeds and geocoding fails", function() {
    it("should fire a didFailToGeocode event", function() {

    });

    it("should render a warning", function() {

    });

  });

  describe("When geolocation fails", function() {
    it("should fire a didFailToUpdatePosition event", function() {

    });
  });


  

  //it("should update view with new coordinates", function() {
  //  var geoposition =  { coords: { latitude: 33.882973359510984, longitude: 151.26951911449567, altitude: null, accuracy: 65, altitudeAccuracy: null, heading: null, speed: null }, timestamp: 415836029296 };
  //  var position = new App.Position({ geoposition: geoposition });
  //  var locationProvider = new App.LocationProvider();
  //  var coordinateView = new App.CoordinateView({ 
  //    locationProvider: locationProvider,
  //    geocoder: new App.Geocoder 
  //  });
//
  //  locationProvider.trigger('didUpdateLocation', position);
//
  //  console.log("coordinateView el: ", coordinateView.el);
  //  expect(coordinateView.el).toMatch(/*33.882973*/);
  //  expect(coordinateView.el).toMatch(/*151.269519*/);
  //});
//
  //it("should update view with suburb and state", function() {
  //  spyOn(this.coordinateView.locationProvider, 'getCurrentPosition').and.callFake(function() {
  //    var d = new $.Deferred();
  //    d.resolve(positionStub);
  //    return d;
  //  });
//
  //  this.coordinateView.render();
//
  //  expect(this.coordinateView.el).toMatch(/*North Bondi, NSW*/);
  //});
});