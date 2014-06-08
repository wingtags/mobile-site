describe("LocationView", function() {

  

  it("Should accept a locationProvider object on instantiation", function() {
    var locationView = new App.LocationView({ locationProvider: new App.LocationProvider() });

    expect(locationView.locationProvider).toExist();
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

  //describe("When a CoordinateView is rendered", function() {
  //  this.isAvail = App.LocationProvider.prototype.isAvailable;
  //  this.pos = App.LocationProvider.prototype.getCurrentPosition;
//
  //  beforeEach(function() {
  //    App.LocationProvider.prototype.isAvailable = function() { return false; };
  //    App.LocationProvider.prototype.getCurrentPosition = function() { return new $.Deferred().resolve(geopositionStub).promise(); };
  //    this.locationProviderStub = new App.LocationProvider();
  //  });
//
  //  afterEach(function() {
  //    App.LocationProvider.prototype.isAvailable = this.isAvail;
  //    App.LocationProvider.prototype.getCurrentPosition = this.pos;
  //  });
//
  //  it("should trigger a didUpdateLocation event when a didUpdatePosition event is received from the CoordinateView", function() {
  //    var view = new App.CoordinateView({ locationProvider: locationProviderStub });
//
  //  });
  //});



  describe("on GPS error", function() {
    beforeEach(function() {
      this.locationView = new App.LocationView({ locationProvider: new App.LocationProvider() });
    });

    it("renders an addressView", function() {
      var locationProvider = new App.LocationProvider();
      var locationView = new App.LocationView({ locationProvider: locationProvider });

      locationView.locationProvider.trigger('didFailToUpdateLocation', {});

      expect(locationView.el).toContainElement('input#suburb');
      expect(locationView.el).not.toContainElement('span#gps-status');
    });
  });

  describe("When geolocation is not supported by the browser", function() {
    beforeEach(function() {
      helper.fakeLocationProvider({ simulateMissingGeolocation : true});
      this.locationView = new App.LocationView({ locationProvider: new App.LocationProvider() });
    });

    afterEach(function() {
      helper.restoreLocationProvider();
    });

    it("Instantiates an AddressView", function() {
      this.locationView.render();
      expect(this.locationView.addressView).toExist();
    });

    it("Does not render a CoordinateView", function() {
      this.locationView.render();
      expect(this.locationView.el).not.toContainElement('span#gps-status');
    });
  });

  describe("When geolocation is supported by the browser", function() {

    beforeEach(function() {
      helper.fakeLocationProvider({ simulateMissingGeolocation : false});
      this.locationView = new App.LocationView({ locationProvider: new App.LocationProvider() });
    });

    afterEach(function() {
      helper.restoreLocationProvider();
    });

    it("Instantiates a CoordinateView", function() {
      this.locationView.render();
      expect(this.locationView.coordinateView).toExist();
    });

    it("Does not render an AddressView", function() {
      this.locationView.render();
      expect(this.locationView.el).not.toContainElement('input#suburb');
    });

    it("Renders a gps status field", function() {
      var el = this.locationView.render().$el;
      expect(el).toContainElement('span#gps-status');
    });

    describe("When location is updated", function() {

      beforeEach(function() {
        this.geoStub = { 
          coords: {
            latitude: 33.882973359510984,
            longitude: 151.26951911449567,
            altitude: null,
            accuracy: 65, 
            altitudeAccuracy: null,
            heading: null,
            speed: null
          }, 
          timestamp: 415836029296
        }
      });

      it("should render new coords in view", function() {
        this.locationView.trigger('didUpdateLocation', [this.geoStub]);
      });
    });
  });
});