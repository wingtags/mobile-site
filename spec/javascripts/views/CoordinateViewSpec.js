describe("CoordinateView", function() {

  beforeEach(function() {
    this.coordinateView = new App.CoordinateView({
      locationProvider: new App.LocationProvider(),
      geocoder: new App.Geocoder()
    });
  });

  it("should accept a locationProvider object on instantiation", function() {
    var locationProvider = new App.LocationProvider();
    var coordinateView = new App.CoordinateView({locationProvider: locationProvider});

    expect(coordinateView.locationProvider).toEqual(locationProvider);
  });

  it("should update view with new coordinates", function() {
    var geoposition =  { coords: { latitude: 33.882973359510984, longitude: 151.26951911449567, altitude: null, accuracy: 65, altitudeAccuracy: null, heading: null, speed: null }, timestamp: 415836029296 };
    var position = new App.Position({ geoposition: geoposition });
    var locationProvider = new App.LocationProvider();
    var coordinateView = new App.CoordinateView({ 
      locationProvider: locationProvider,
      geocoder: new App.Geocoder 
    });

    locationProvider.trigger('didUpdateLocation', position);

    console.log("coordinateView el: ", coordinateView.el);
    expect(coordinateView.el).toMatch(/*33.882973*/);
    expect(coordinateView.el).toMatch(/*151.269519*/);
  });

  it("should update view with suburb and state", function() {
    spyOn(this.coordinateView.locationProvider, 'getCurrentPosition').and.callFake(function() {
      var d = new $.Deferred();
      d.resolve(positionStub);
      return d;
    });

    this.coordinateView.render();

    expect(this.coordinateView.el).toMatch(/*North Bondi, NSW*/);
  });
});