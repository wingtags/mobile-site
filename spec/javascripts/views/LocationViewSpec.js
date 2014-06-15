describe("LocationView", function() {

  beforeEach(function() {
    this.locationProvider = new helper.fakeLocationProvider3();
    this.geocodingProvider = new helper.fakeGeocoder2();
    this.locationView = new App.LocationView({
      locationProvider: this.locationProvider,
      geocodingProvider: this.geocodingProvider
    });
  });

  it("should raise an exception if a LocationProvider is not supplied", function() {
    var options = { geocodingProvider: this.geocodingProvider };
    var constructorFn = function() { new App.LocationView(options); };
    expect(constructorFn).toThrow(new TypeError("A LocationProvider must be supplied"));
  });

  it("should raise an exception if a GeocodingProvider is not supplied", function() {
    var options = { locationProvider: this.locationProvider };
    var constructorFn = function() { new App.LocationView(options); };
    expect(constructorFn).toThrow(new TypeError("A GeocodingProvider must be supplied"));
  });


  describe("When geolocation is supported by the browser", function() {
    
    it("LocationView should render a 'loading' view while location is acquired", function() {  
      var $el = this.locationView.render().$el;
      expect($el).toContainText('Getting Location...');
    });

    describe("and we successfully acquire location coordinates", function() {
      beforeEach(function() {
        this.locationProvider.deferred.resolve(geopositionStub);
      });

      describe("and we successfully geocode an address from the coordinates", function(){ 
        beforeEach(function() {
          this.geocodingProvider.deferred.resolve(addressStub);
          this.locationView.render();
        });

        it("LocationView should render a CoordinateView", function() {      
          expect(this.locationView.coordinateView).toExist();
        });
  
        it("LocationView should not render an AddressView", function() {
          expect(this.locationView.el).not.toContainElement('input#suburb');
        });

        it("LocationView should populate its location model", function() {
          expect(this.locationView.location.latitude).toBe(latlngStub.latitude);
        });
      });

      describe("and we fail to geocode an address from the coordinates", function() {
        beforeEach(function() {
          this.geocodingProvider.deferred.reject();
          this.locationView.render();
        });
    
        it("LocationView should render an AddressView", function() {
          expect(this.locationView.addressView).toExist();
        });
    
        it("LocationView should not render a CoordinateView", function() {
          expect(this.locationView.el).not.toContainElement('span#gps-status');
        });
      });
    });


    describe("and we fail to acquire location coordinates", function() {
      beforeEach(function() {
        this.locationProvider.deferred.reject();
        this.locationView.render();
      });

      it("should render an AddressView", function() {
        expect(this.locationView.addressView).toExist();
      });
  
      it("should not render a CoordinateView", function() {
        expect(this.locationView.el).not.toContainElement('span#gps-status');
      });
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
    //beforeEach(function() {
    //  this.locationView = new App.LocationView({ 
    //    locationProvider: helper.fakeLocationProvider2({ simulateMissingGeolocation: true }),
    //    geocodingProvider: helper.fakeGeocoder()
    //  });
    //});

    beforeEach(function() {
      this.locationProvider.deferred.reject();
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

  
  describe("When a CoordinateView is rendered", function() {

    beforeEach(function(){
      this.locationProvider.deferred.resolve(geopositionStub);
      this.geocodingProvider.deferred.resolve(addressStub);
      this.locationView.render();
    });

    it("LocationView should populate its location model with coordinates and an address", function() {
      expect(this.locationView.location).toEqual(locationStub);
    });
  });



  describe("When an AddressView is rendered", function() {
    beforeEach(function() {
      this.locationProvider.deferred.reject();
      this.locationView.render();
    });

    it("LocationView should populate its location model when a didUpdateAddress event is received from the AddressView", function() {
      this.locationView.addressView.trigger('didUpdateAddress', 'some address');
      expect(this.locationView.location.address).toBe('some address');
    });
  });
});