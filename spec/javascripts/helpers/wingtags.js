var helper = window.helper != null ? window.helper : {};

helper.fakeLocationProvider = function(options) {
  helper._originalIsAvailableFn = App.LocationProvider.prototype.isAvailable;
  helper._originalGetCurrentPositionFn = App.LocationProvider.prototype.getCurrentPosition;
  helper._originalStartUpdatingLocationFn = App.LocationProvider.prototype.startUpdatingLocation;

  App.LocationProvider.prototype.startUpdatingLocation = function() {};

  if (options != undefined) {
    if (options.simulateMissingGeolocation == true) {
      App.LocationProvider.prototype.isAvailable = function() { return false; };
    }
  } else {
    App.LocationProvider.prototype.isAvailable = function() { return true; };
    App.LocationProvider.prototype.getCurrentPosition = function() {
      var deferred = new $.Deferred();
      return deferred.resolve(geopositionStub).promise();
    }
  }
};


helper.restoreLocationProvider = function() {
  App.LocationProvider.prototype.isAvailable = helper._originalIsAvailableFn;
  App.LocationProvider.prototype.getCurrentPosition = helper._originalGetCurrentPositionFn;
  App.LocationProvider.prototype.startUpdatingLocation = helper._originalStartUpdatingLocationFn;
};


helper.stubGeocoder = function() {
  helper.originalReverseGeocodeFn = App.GeocodingProvider.prototype.reverseGeocode;
  App.GeocodingProvider.prototype.reverseGeocode = function() { 
    var deferred = new $.Deferred();
    deferred.resolve(addressStub);
    return deferred.promise();
  }
};

helper.restoreGeocoder = function() {
  App.GeocodingProvider.prototype.reverseGeocode = helper.originalReverseGeocodeFn;
};


helper.fakeGeocoder = function(options) {
  var _originalReverseGeocodeFn = App.GeocodingProvider.prototype.reverseGeocode;
  var geocoder;

  if (options == undefined)
  {
    App.GeocodingProvider.prototype.reverseGeocode = function() { 
      var deferred = new $.Deferred();
      deferred.resolve(addressStub);
      return deferred.promise();
    }
  }

  geocoder = new App.GeocodingProvider();

  App.GeocodingProvider.prototype.reverseGeocode = _originalReverseGeocodeFn;
  return geocoder;
};

helper.fakeLocationProvider2 = function(options) {
  helper._originalIsAvailableFn = App.LocationProvider.prototype.isAvailable;
  helper._originalGetCurrentPositionFn = App.LocationProvider.prototype.getCurrentPosition;
  helper._originalStartUpdatingLocationFn = App.LocationProvider.prototype.startUpdatingLocation;

  App.LocationProvider.prototype.startUpdatingLocation = function() {};

  if (options != undefined) {
    if (options.simulateMissingGeolocation == true) {
      App.LocationProvider.prototype.isAvailable = function() { return false; };
    }
  } else {
    App.LocationProvider.prototype.isAvailable = function() { return true; };
    App.LocationProvider.prototype.getCurrentPosition = function() {
      var deferred = new $.Deferred();
      return deferred.resolve(geopositionStub).promise();
    }
  }

  var _provider = new App.LocationProvider();
  
  App.LocationProvider.prototype.isAvailable = helper._originalIsAvailableFn;
  App.LocationProvider.prototype.getCurrentPosition = helper._originalGetCurrentPositionFn;
  App.LocationProvider.prototype.startUpdatingLocation = helper._originalStartUpdatingLocationFn;

  return _provider;
};


helper.fakeLocationProvider3 = function(options) {
  var fn_stash = {
    isAvailable: App.LocationProvider.prototype.isAvailable,
    getCurrentPosition: App.LocationProvider.prototype.getCurrentPosition,
    startUpdatingLocation: App.LocationProvider.prototype.startUpdatingLocation
  };

  var deferred = new $.Deferred();

  App.LocationProvider.prototype.startUpdatingLocation = function() {};
  App.LocationProvider.prototype.isAvailable = function() { return true; };
  App.LocationProvider.prototype.getCurrentPosition = function() { return deferred.promise(); }

  var fake = new App.LocationProvider();
  fake.deferred = deferred;

  App.LocationProvider.prototype.startUpdatingLocation = fn_stash.startUpdatingLocation;
  App.LocationProvider.prototype.isAvailable = fn_stash.isAvailable;
  App.LocationProvider.prototype.getCurrentPosition = fn_stash.getCurrentPosition;

  return fake;
};