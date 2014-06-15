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

  xit("should create an AppView", function() {
    expect(this.router instanceof App.Router).toBeTruthy();
  });

  xit("should configure the AppView with a locationProvider, imageProvider and geocoder", function() {
    var appView = this.router.appView;

    expect(appView.locationProvider).toExist();
    expect(appView.imageProvider).toExist();
    expect(appView.geocodingProvider).toExist();
  });

  xdescribe("Home route", function() {
    beforeEach(function() {
      setFixtures("<div id='app-container'></div>");
    });
    
    it("should render content when user visits home page", function() {
      this.router.home();
      expect($("#app-container").children().length).toBeGreaterThan(0);
    });
  });
});