describe("Geocoder", function() {
  beforeEach(function() {
    this.geo = new App.Geocoder();
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];

    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it("should reverse geocode a Position", function() {
    this.geo.reverseGeocode(positionStub);

    expect(this.requests.length).toEqual(1);
  });

  it("should properly construct the request url", function() {
    this.geo.reverseGeocode(positionStub);
    var expectedUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + positionStub.get('latitude') + '%2C' + positionStub.get('longitude') + '&sensor=true';
    expect(this.requests[0].url).toBe(expectedUrl);
  });

  it("should return an address", function() { 
    var address = this.geo.getAddressForPosition(addressStub);

    expect(address.get('suburb')).toBe('North Bondi');
    expect(address.get('stateAbbrev')).toBe('NSW');
  });
});