describe("GeocodingProvider", function() {
  beforeEach(function() {
    this.geo = new App.GeocodingProvider();
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];

    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
  });



  describe("ReverseGeocode", function() {
    //beforeEach(function() {
    //  this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));
    //});

    it("should make a request to google's API", function() {
      this.geo.reverseGeocode({latitude: -33.882973359510984, longitude: 151.26951911449567});
      var expectedUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + '-33.882973359510984' + '%2C' + '151.26951911449567' + '&sensor=true';
      expect(this.requests[0].url).toBe(expectedUrl);
    });

    it("should return a resolved promise on success", function(done) {
      var address_promise = this.geo.reverseGeocode(latlngStub);
      this.requests[0].respond( 200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));

      address_promise.then(
        function(address) {
          expect(address).toEqual(addressStub);
        },
        function(error) {
          expect(false).toBe(true);
        }
      );
      done();
    });

    it("should return a reject promise on failure", function(done) {
      var address_promise = this.geo.reverseGeocode(latlngStub);
      this.requests[0].respond( 500, { "Content-Type": "application/json" }, "{'error': 'Server error'}");

      address_promise.then(
        function(address) {
          expect(false).toBe(true);
        },
        function(error) {
          expect(error).toBeTruthy();
        }
      );
      done();
    });
  });



  //it("should return a Position object on success", function(done) {
  //  var lat = geopositionStub.coords.latitude;
  //  var lon = geopositionStub.coords.longitude;
//
  //  var p = this.geo.reverseGeocode({ latitude: lat, longitude: lon });
  //  this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));
//
  //  p.then(
  //    function(position) {
  //      //console.log('promise returned with: ', position);
  //      expect(position).toEqual(locationStub);//_.isEqual(position, positionStub)).toBe(true);
  //    },
  //    function(error) {
  //      expect(error).not.toBeDefined();
  //    })
  //    .always(done);

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
  //});

  

  xit("should return an address", function() { 
    var address = this.geo.getAddressForPosition(latlngStub);//addressStub);
    this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(addressStub));

    expect(address.get('suburb')).toBe('North Bondi');
    expect(address.get('stateAbbrev')).toBe('NSW');
  });

});

