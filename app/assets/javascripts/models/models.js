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
    _.bindAll(
      this, 
      'isAvailable', 
      'startUpdatingLocation', 
      'getCurrentPosition', 
      'onSuccess', 
      'onError'
    );

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
    var deferred = new $.Deferred();

    if (this.isAvailable()) {  
      var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000
      };

      var resolve = function(position) { deferred.resolve(position); };
      var reject = function(error) { deferred.reject(error); };

      this._base.getCurrentPosition(resolve, reject, options);

    } else {
      deferred.reject("Geolocation is not supported.");
      this.onError();
    };

    return deferred.promise();
  },

  onSuccess: function(position) { 
    var positionModel = new App.Position({ geoposition: position });
    this.set('lastLocation', positionModel);
    this.trigger('didUpdateLocation', positionModel);
    this.trigger('didUpdateLocation2', position);
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
  
  
App.GeocodingProvider = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this,
      'reverseGeocode',
      '_fetchAddress'
    )
  },

  reverseGeocode: function(latlng) {
    var deferred = new $.Deferred();
    
    var xhr = this._fetchAddress(latlng);
    xhr.then(
      function(data) {
        deferred.resolve(data);
      },
      function(xhr, status, error) {
        deferred.fail(error);
      }
    );

    return deferred.promise();
  },

  _fetchAddress: function(coords) {
    var xhr = $.ajax("https://maps.googleapis.com/maps/api/geocode/json",
      { 
        data: { 
          latlng: coords.latitude + ',' + coords.longitude, 
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

    address.set('suburb', this.getValueForAttribute( ));
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
  validate: function(attrs, options) {
    var errors = [];
    var attrs = typeof(attrs) === "undefined" ? this.attributes : attrs;

    if (_.isUndefined(attrs.tag) || attrs.tag.length === 0) { 
      errors.push({
        'code' : 'missing_field',
        'title' : 'Please enter a tag number',
        'path' : '/tag',
      });
    }

    if (_.isUndefined(attrs.latitude) || _.isUndefined(attrs.longitude) ||
        attrs.latitude.length === 0 || attrs.longitude.length === 0) {
      if (_.isUndefined(attrs.suburb) || attrs.suburb.length === 0) {
        errors.push({
          'code' : 'missing_field',
          'title' : 'You need to enter a suburb',
          'path' : '/suburb'
        });
      }
    }

    if (errors.length > 0) { return errors; }
  }
  // image
  // latitude
  // longitude
  // location
  // timestamp
  // tag
});