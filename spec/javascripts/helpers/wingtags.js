var helper = window.helper != null ? window.helper : {};

helper.fakeLocationProvider = function(options) {
  helper._originalIsAvailableFn = App.LocationProvider.prototype.isAvailable;
  helper._originalGetCurrentPositionFn = App.LocationProvider.prototype.getCurrentPosition;

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
};

helper.stubGeocoder = function() {
  helper.originalReverseGeocodeFn = App.Geocoder.prototype.reverseGeocode;
  App.Geocoder.prototype.reverseGeocode = function() { 
    var deferred = new $.Deferred();
    deferred.resolve(addressStub);
    return deferred.promise();
  }
}

helper.restoreGeocoder = function() {
  App.Geocoder.prototype.reverseGeocode = helper.originalReverseGeocodeFn;
},

helper.fakeGeocoder = function(options) {
  var _originalReverseGeocodeFn = App.Geocoder.prototype.reverseGeocode;
  var geocoder;

  if (options == undefined)
  {
    App.Geocoder.prototype.reverseGeocode = function() { 
      var deferred = new $.Deferred();
      deferred.resolve(addressStub);
      return deferred.promise();
    }
  }

  geocoder = new App.Geocoder();

  App.Geocoder.prototype.reverseGeocode = _originalReverseGeocodeFn;
  return geocoder;
}

helper.fakeLocationProvider2 = function(options) {
  helper._originalIsAvailableFn = App.LocationProvider.prototype.isAvailable;
  helper._originalGetCurrentPositionFn = App.LocationProvider.prototype.getCurrentPosition;

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

  return _provider;
};