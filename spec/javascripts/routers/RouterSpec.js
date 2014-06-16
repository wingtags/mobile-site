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

  xit("should create an FormView", function() {
    expect(this.router instanceof App.Router).toBeTruthy();
  });

  xit("should configure the FormView with a locationProvider, imageProvider and geocoder", function() {
    var formView = this.router.formView;

    expect(formView.locationProvider).toExist();
    expect(formView.imageProvider).toExist();
    expect(formView.geocodingProvider).toExist();
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