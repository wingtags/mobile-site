var helper = window.helper != null ? window.helper : {};

helper.fakeLocationProvider = function(options) {
  helper._originalIsAvailableFn = App.LocationProvider.prototype.isAvailable;
  helper._originalGetCurrentPositionFn = App.LocationProvider.prototype.getCurrentPosition;

  if (options.simulateMissingGeolocation == true) {
    App.LocationProvider.prototype.isAvailable = function() { return false; };

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