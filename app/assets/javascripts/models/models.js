var App = window.App != null ? window.App : {};
  
App.Position = Backbone.Model.extend({
  initialize: function(options) {
    _.bindAll(this, 'setAttributesFromGeoposition');
    if (options !== undefined) {
      if (options.geoposition !== undefined) {
        this.setAttributesFromGeoposition(options.geoposition);
      }
    }
  },

  setAttributesFromGeoposition: function(geoposition) {
    this.set(geoposition.coords);
    this.set({ timestamp: geoposition.timestamp });
  }
});
  
  
App.LocationProvider = Backbone.Model.extend({
  initialize: function() {
    _.bindAll(this, 'isAvailable', 'startUpdatingLocation', 'getCurrentPosition', 'onSuccess', 'onError');
    if (this.isAvailable()) { 
      this._base = window.navigator.geolocation;
    }
  }, 
  isAvailable:  function() {
    return 'geolocation' in window.navigator;
  },
  startUpdatingLocation: function() {
    if (this.isAvailable()) {
      var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000
      };
      var watchID = this._base.watchPosition(this.onSuccess, this.onError, options);
      this.set('watchID', watchID);
    }
  },
  getCurrentPosition: function() {
    if (this.isAvailable()) {
      var deferred = new $.Deferred();
      var onSuccess = function(position) { deferred.resolve(new App.Position({geoposition: position}) ); };
      var onError = function(error) { deferred.resolve(error); };
      var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000
      };

      this._base.getCurrentPosition(this.onSuccess, this.onError, options);
      this._base.getCurrentPosition(onSuccess, onError, options);
      return deferred.promise();
    } else
    {
      this.onError();
    }
  },
  onSuccess: function(position) { 
    var positionModel = new App.Position({ geoposition: position });
    this.set('lastLocation', positionModel);
    this.trigger('didUpdateLocation', positionModel);
  },
  onError: function(error) { 
    this.trigger('didFailToUpdateLocation', error);
  }
});
  
App.ImageProvider = Backbone.Model.extend({
  isAvailable: function() {
    //return 'capture' in document.createElement('input');
    if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
      return false;
    } else {
      return true;
    }
  }
});
  
  
App.Geocoder = Backbone.Model.extend({
  reverseGeocode: function(position) {
    var xhr = $.ajax(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        data: { 
          latlng: position.get('latitude') + ',' + position.get('longitude'), 
          sensor: true
        },
        dataType: "json"
      }
    );
    return xhr;
  },

  getSuburbStateString: function(data) {
    return this.getSuburbName(data) + ', ' + this.getStateAbbrev(data);
  },

  getStateAbbrev: function(data) {
    var address = data.results[0];
    var stateObj = _.find(address.address_components, function(component) {
      return _.contains(component.types, 'administrative_area_level_1');
    });
    if (stateObj !== undefined) {
      return stateObj.short_name;
    } else {
      return '';
    }
  },

  getSuburbName: function(data) {
    var address = data.results[0];
    var suburbObj = _.find(address.address_components, function(component) {
      return _.contains(component.types, 'locality');
    });
    if (suburbObj !== undefined) {
      return suburbObj.long_name;
    } else {
      return '';
    }
  },

  getAddressForPosition: function(data) {
    var address = new App.Address();

    address.set('suburb', this.getValueForAttribute(data, 'long_name', 'locality'));
    address.set('stateAbbrev', this.getValueForAttribute(data, 'short_name', 'administrative_area_level_1'));

    return address;
  },

  getValueForAttribute: function(data, valueKey, addressType) {
    var address = data.results[0];
    var x = _.find(address.address_components, function(component) {
      return _.contains(component.types, addressType);
    });

    if (x === undefined) {
      return '';
    } else {
      return x[valueKey] !== undefined ? x[valueKey] : ''
    }
  }
});
  
  
App.Address = Backbone.Model.extend({ });

App.Observation = Backbone.Model.extend({
  // image
  // latitude
  // longitude
  // location
  // timestamp
  // wildlife
});