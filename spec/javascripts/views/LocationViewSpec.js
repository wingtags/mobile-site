describe("LocationView", function() {

  beforeEach(function() {
    this.locationView = new App.LocationView({ locationProvider: new App.LocationProvider() });
    //this.locationView.locationProvider = new LocationProvider();
  });

  it("Should accept a locationProvider object on instantiation", function() {
    var locationView = new App.LocationView({ locationProvider: App.LocationProvider() });

    expect(locationView.locationProvider).toExist();
  });

  describe("on GPS error", function() {
    it("renders an addressView", function() {
      var locationProvider = new App.LocationProvider();
      var locationView = new App.LocationView({ locationProvider: locationProvider });

      locationView.locationProvider.trigger('didFailToUpdateLocation', {});

      expect(locationView.el).toContainElement('input#suburb');
      expect(locationView.el).not.toContainElement('span#gps-status');
    });
  });

  describe("When GPS is not available:", function() {

    beforeEach(function() {
      this.locationView.locationProvider.isAvailable = function() { return false; };
    });

    it("Instantiates an AddressView", function() {
      this.locationView.render();
      expect(this.locationView.addressView).toExist();
    });

    it("Does not render a CoordinateView", function() {
      this.locationView.render();
      expect(this.locationView.el).not.toContainElement('span#gps-status');
    });

    it("Renders a suburb field", function() {
      var el = this.locationView.render().$el;
      expect(el).toContainElement('#suburb');
    });

    it("Renders a street field", function() {
      var el = this.locationView.render().$el;
      expect(el).toContainElement('#street');
    });
  });

  describe("When GPS is available", function() {

    beforeEach(function() {
      this.locationView.locationProvider.isAvailable = function() { return true; }
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