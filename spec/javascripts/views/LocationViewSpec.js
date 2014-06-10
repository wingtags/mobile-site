describe("LocationView", function() {

  it("Should accept locationProvider and geocodingProvider on instantiation", function() {
    var locationView = new App.LocationView({
      locationProvider: helper.fakeLocationProvider2(),
      geocodingProvider: helper.fakeGeocoder()
    });

    expect(locationView.locationProvider).toExist();
    expect(locationView.geocodingProvider).toExist();
  });




  describe("When an AddressView is rendered", function() {

    beforeEach(function() {
      this.orig = App.LocationProvider.prototype.isAvailable;
      App.LocationProvider.prototype.isAvailable = function() { return false; };

      var locationProviderStub = new App.LocationProvider();
      this.locationView = new App.LocationView({locationProvider: locationProviderStub});
    });

    afterEach(function() {
      App.LocationProvider.prototype.isAvailable = this.orig;
    });

    it("should trigger a didUpdateLocation event when a didUpdateAddress event is received from the AddressView", function() {
      var spy = sinon.spy();
      this.locationView.on('didUpdateLocation', spy);

      this.locationView.render();
      this.locationView.addressView.trigger('didUpdateAddress', 'addressString');

      var location = spy.args[0][0];
      expect(location.address).toBe('addressString');
    });
  });


  describe("When geolocation is supported by the browser", function() {

    beforeEach(function() {
      var options = {
        locationProvider: helper.fakeLocationProvider2(),
        geocodingProvider: helper.fakeGeocoder()
      };

      this.locationView = new App.LocationView(options);
      console.log('beforeEach locationView', this.locationView);
    });

    it("should render a CoordinateView", function() {
      console.log('locationView: ', this.locationView);
      this.locationView.render();
      expect(this.locationView.coordinateView).toExist();
    });

    it("should not render an AddressView", function() {
      this.locationView.render();
      expect(this.locationView.el).not.toContainElement('input#suburb');
    });

    // This belongs in the CoordinateView specs
    xit("should render a gps status field", function() {
      var el = this.locationView.render().$el;
      expect(el).toContainElement('span#gps-status');
    });

    // Define behaviour in CoordinateView first
    xit("should raise a didUpdateLocation event when geolocation completes", function() {
      var spy = sinon.spy();
      this.locationView.on('didUpdateLocation', spy);

      this.locationView.render();
      this.locationView.coordinateView.trigger('didUpdateCoordinates', locationStub);

      //var location = spy.args[0][0];
      expect(spy.calledOnce).toBe(true);
      //expect(spy.args[0][0]).toBe(locationStub);
    });


    //describe("When location is updated", function() {
//
    //  beforeEach(function() {
    //    this.geoStub = { 
    //      coords: {
    //        latitude: 33.882973359510984,
    //        longitude: 151.26951911449567,
    //        altitude: null,
    //        accuracy: 65, 
    //        altitudeAccuracy: null,
    //        heading: null,
    //        speed: null
    //      }, 
    //      timestamp: 415836029296
    //    }
    //  });
//
    //  it("should render new coords in view", function() {
    //    this.locationView.trigger('didUpdateLocation', [this.geoStub]);
    //  });
    //});
  });


  describe("When geolocation is not supported by the browser", function() {
    beforeEach(function() {
      this.locationView = new App.LocationView({ 
        locationProvider: helper.fakeLocationProvider2({ simulateMissingGeolocation: true }),
        geocodingProvider: helper.fakeGeocoder()
      });
    });

    it("should render an AddressView", function() {
      this.locationView.render();
      expect(this.locationView.addressView).toExist();
    });

    it("should not render a CoordinateView", function() {
      this.locationView.render();
      expect(this.locationView.el).not.toContainElement('span#gps-status');
    });

    it("should trigger a didUpdateLocation event when a didUpdateAddress event is received from the AddressView", function() {
      var spy = sinon.spy();
      this.locationView.on('didUpdateLocation', spy);

      this.locationView.render();
      this.locationView.addressView.trigger('didUpdateAddress', 'addressString');

      var location = spy.args[0][0];
      expect(location.address).toBe('addressString');
    });
  });


  describe("When there is an error during geolocaiton", function() {
    beforeEach(function() {
      this.locationView = new App.LocationView({ 
        locationProvider: helper.fakeLocationProvider2({ simulateMissingGeolocation: true }),
        geocodingProvider: helper.fakeGeocoder()
      });
    });

    it("renders an addressView", function() {
      this.locationView.locationProvider.trigger('didFailToUpdateLocation', {});

      expect(this.locationView.el).toContainElement('input#suburb');
      expect(this.locationView.el).not.toContainElement('span#gps-status');
    });
  });
});