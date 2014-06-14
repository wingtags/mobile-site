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

  it("should return a Position object on success", function(done) {
    var lat = geopositionStub.coords.latitude;
    var lon = geopositionStub.coords.longitude;

    var p = this.geo.reverseGeocode({ latitude: lat, longitude: lon });
    this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));

    p.then(
      function(position) {
        //console.log('promise returned with: ', position);
        expect(position).toEqual(locationStub);//_.isEqual(position, positionStub)).toBe(true);
      },
      function(error) {
        expect(error).not.toBeDefined();
      })
      .always(done);

    //runs( 
    //  function() 
    //  {
    //    return this.geo.reverseGeocode({ latitude: lat, longitude: lon });
    //  },
    //  function checkExpectations( result ) 
    //  {
    //    expect(_.IsEqual(result, positionStub)).toBe(true);
    //  }
    //);
    //var p = this.geo.reverseGeocode({ latitude: lat, longitude: lon });
    //
    //p.then(function(args) { 
    //  expect(_.IsEqual(args, positionStub)).toBe(false); 
    //}, function() {
    //  expect(true).toBe(false);
    //}); 
  });

  it("should properly construct the request url", function() {
    this.geo.reverseGeocode({latitude: -33.882973359510984, longitude: 151.26951911449567});
    var expectedUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + '-33.882973359510984' + '%2C' + '151.26951911449567' + '&sensor=true';
    expect(this.requests[0].url).toBe(expectedUrl);
  });

  xit("should return an address", function() { 
    var address = this.geo.getAddressForPosition(latlngStub);//addressStub);
    this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));

    expect(address.get('suburb')).toBe('North Bondi');
    expect(address.get('stateAbbrev')).toBe('NSW');
  });

});