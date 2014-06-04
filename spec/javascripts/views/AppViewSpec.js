describe("AppView", function() {

  beforeEach(function() {
    setFixtures("<div id='app-container'><div id='tag-capture'></div><div id='location-captyer'</div></div>");
    this.appView = new App.AppView({
      locationProvider: new App.LocationProvider(),
      imageProvider:    new App.ImageProvider(),
      geocoder:         new App.Geocoder()
    });
  });

  describe("initialize()", function() {

    it("should instantiate an IdentifierView", function() {
      var view = _.find(this.appView.subviews, function(view) { return view instanceof App.IdentifierView; })
      expect(view).toExist();
    });
  
    it("should instantiate a LocationView", function() {
      var view = _.find(this.appView.subviews, function(view) { return view instanceof App.LocationView; })
      expect(view).toExist();
    });
  
    it("should instantiate an ImageView if browser supports camera capture", function() {
      this.appView.subviews = [];
      this.appView.imageProvider.isAvailable = function() { return true; };
      this.appView.initializeSubviews();
  
      var view = _.find(this.appView.subviews, function(view) { return view instanceof App.ImageView; })
      expect(view).toExist();
    });
  
    it("should not instantiate an ImageView if browser does not support camera capture", function() {
      this.appView.subviews = [];
      this.appView.imageProvider.isAvailable = function() { return false; };
      this.appView.initializeSubviews();
  
      var view = _.find(this.appView.subviews, function(view) { return view instanceof App.ImageView; })
      expect(view).not.toExist();
    });

    it("should call startUpdatingLocation on LocationProvider", function() {
      var locProviderStub = new App.LocationProvider();
      locProviderStub.isAvailable = function() { return true; };
      var spy = sinon.spy(locProviderStub, 'startUpdatingLocation');

      var view = new App.AppView({ 
        locationProvider: locProviderStub,
        imageProvider: new App.ImageProvider() 
      });
      
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe("render()", function() {

    it("should call render on all subviews", function() {

      var locationProvider = new App.LocationProvider();
      locationProvider.isAvailable = function() { return true; }

      var imageProvider = new App.ImageProvider();
      imageProvider.isAvailable = function() { return true; }

      this.appView.locationProvider = locationProvider;
      this.appView.imageProvider = imageProvider;

      this.appView.initializeSubviews();
      this.appView.subviews.map(function(view) { sinon.spy(view, 'render'); });

      this.appView.render();
      this.appView.subviews.map(function(view) { expect(view.render.calledOnce).toBeTruthy; });
    }); 

    it("should return itself", function() {
      var returnedObj = this.appView.render();
      expect(returnedObj).toBe(this.appView);
    });
  });
});