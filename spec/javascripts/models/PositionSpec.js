describe("Position", function() {
  it("should exist", function() {
    var position = new App.Position();
    expect(position).toExist();
  });

  it("should accept a geoposition object on instantiation", function() {
    var geoposition = { 
      coords: {
        latitude: 33.882973359510984,
        longitude: 151.26951911449567,
        altitude: 10,
        accuracy: 65, 
        altitudeAccuracy: 50,
        heading: 90,
        speed: 1
      }, 
      timestamp: 415836029296
    }

    var position = new App.Position({ geoposition: geoposition });

    console.log('position: ', position);

    expect(position.get('latitude')).toBe(33.882973359510984);
    expect(position.get('longitude')).toBe(151.26951911449567);
    expect(position.get('altitude')).toBe(10);
    expect(position.get('accuracy')).toBe(65);
    expect(position.get('altitudeAccuracy')).toBe(50);
    expect(position.get('heading')).toBe(90);
    expect(position.get('speed')).toBe(1);
    expect(position.get('timestamp')).toBe(415836029296);
  });
});