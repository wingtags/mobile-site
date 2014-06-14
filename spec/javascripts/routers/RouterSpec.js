describe("RouterSpec", function() {

  beforeEach(function() {
    helper.fakeLocationProvider();
    helper.stubGeocoder();
    this.router = new App.Router();
  });

  afterEach(function() {
    helper.restoreLocationProvider();
    helper.restoreGeocoder();
  });

  it("should create an AppView", function() {
    expect(this.router instanceof App.Router).toBeTruthy();
  });

  it("should configure the AppView with a locationProvider, imageProvider and geocoder", function() {
    var appView = this.router.appView;

    expect(appView.locationProvider).toExist();
    expect(appView.imageProvider).toExist();
    expect(appView.geocodingProvider).toExist();
  });

  it("should set the locationProvider to start updating the location", function() {
    var spy = spyOn(App.LocationProvider.prototype, 'startUpdatingLocation');
    new App.Router();

    expect(App.LocationProvider.prototype.startUpdatingLocation).toHaveBeenCalled();
  });

  describe("Home route", function() {
    beforeEach(function() {
      setFixtures("<div id='app-container'></div>");
    });
    
    it("should render content when user visits home page", function() {
      this.router.home();
      expect($("#app-container").children().length).toBeGreaterThan(0);
    });
  });
});