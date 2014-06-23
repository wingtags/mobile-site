describe("FormView", function() {

  beforeEach(function() {
    setFixtures("<div id='app-container'><div id='tag-capture'></div><div id='location-captyer'</div></div>");
    this.model = new App.Observation();
    this.formView = new App.FormView({
      locationProvider: helper.fakeLocationProvider2(),
      imageProvider:    new App.ImageProvider(),
      geocodingProvider: helper.fakeGeocoder(),
      model: this.model
    });
  });

  describe("data", function() {
    xit("updateAnimalIdentifier", function() {
      this.formView.updateAnimalIdentifier(22);
      expect(this.formView.model.get('animalIdentifier')).toBe(22);
    });

    xit("updateAddress", function() {
      this.formView.updateAddress(addressStub);
      expect(this.formView.model.get('address')).toBe("343-345 Old South Head Road, North Bondi NSW 2026, Australia");
    });

    xit("updatePosition", function() {
      this.formView.updatePosition(geopositionStub);
      expect(this.formView.model.get('latitude')).toBe(-33.882973359510984);
      expect(this.formView.model.get('longitude')).toBe(151.26951911449567);
    });

    xit("updateImage", function() {
    });
  });

  describe("initialize()", function() {

    it("should instantiate an IdentifierView", function() {
      var view = _.find(this.formView.subviews, function(view) { return view instanceof App.IdentifierView; })
      expect(view).toExist();
    });
  
    it("should instantiate a LocationView", function() {
      var view = _.find(this.formView.subviews, function(view) { return view instanceof App.LocationView; })
      expect(view).toExist();
    });
  
    it("should instantiate an ImageView if browser supports camera capture", function() {
      this.formView.subviews = [];
      this.formView.imageProvider.isAvailable = function() { return true; };
      this.formView.initializeSubviews();
  
      var view = _.find(this.formView.subviews, function(view) { return view instanceof App.ImageView; })
      expect(view).toExist();
    });
  
    it("should not instantiate an ImageView if browser does not support camera capture", function() {
      this.formView.subviews = [];
      this.formView.imageProvider.isAvailable = function() { return false; };
      this.formView.initializeSubviews();
  
      var view = _.find(this.formView.subviews, function(view) { return view instanceof App.ImageView; })
      expect(view).not.toExist();
    });

    it("should instantiate an Observation model", function() {
      expect(this.formView.model instanceof App.Observation).toBe(true);
    });
  });

  describe("send()", function() {
    it("Should not include an image attribute if no image is captured"), function() {
      
    }
  });

  describe("render()", function() {

    it("should call render on all subviews", function() {
      var locationProvider = helper.fakeLocationProvider2();

      var imageProvider = new App.ImageProvider();
      imageProvider.isAvailable = function() { return true; }

      this.formView.locationProvider = locationProvider;
      this.formView.imageProvider = imageProvider;

      this.formView.initializeSubviews();
      this.formView.subviews.map(function(view) { sinon.spy(view, 'render'); });

      this.formView.render();
      this.formView.subviews.map(function(view) { expect(view.render.calledOnce).toBeTruthy; });
    }); 

    it("should return itself", function() {
      var returnedObj = this.formView.render();
      expect(returnedObj).toBe(this.formView);
    });
  });
});