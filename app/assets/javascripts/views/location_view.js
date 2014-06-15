var App = window.App != null ? window.App : {};

App.LocationView = Backbone.View.extend({

  initialize: function(options) {
    _.bindAll(this, 
      'render',
      'renderCoordinateView',
      'renderAddressView',
      'onLocationError',
      '_validateOptions'
    );

    this._validateOptions(options);
    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.locationProvider.on('didFailToUpdateLocation', this.onLocationError);
        
    this.coordinateView = new App.CoordinateView({
      locationProvider: this.locationProvider,
      geocodingProvider: this.geocodingProvider
    });
  },

  _validateOptions: function(options) {
    if (typeof options === "undefined") { throw new TypeError("Options must be supplied"); };
    if (typeof options.locationProvider === "undefined") { throw new TypeError("A LocationProvider must be supplied"); };
    if (typeof options.geocodingProvider === "undefined") { throw new TypeError("A GeocodingProvider must be supplied"); };
  },

  render: function() {
    if (this.locationProvider.isAvailable()) {
      this.renderCoordinateView();        
    } else {
      this.renderAddressView();
    }
    return this;
  },

  renderCoordinateView: function() {
    this.listenTo(this.coordinateView, 'didUpdateCoordinates', this.updateLocation);
    this.$el.append(this.coordinateView.render().el);
  },

  renderAddressView: function() {
    this.addressView = new App.AddressView();
    this.listenTo(this.addressView, 'didUpdateAddress', this.updateAddress);
    this.$el.append(this.addressView.render().el);
  },

  onLocationError: function(e) {
    console.log("ON LOCATION ERROR");
    console.log("this: ", this);
    this.coordinateView.remove();
    this.renderAddressView();
  },

  updateAddress: function(address) {
    var location = {
      'address' : address,
      'latitude' : '',
      'longitude' : ''
    }
    this.trigger('didUpdateLocation', location);
  },

  updateLocation: function(location) {
    var loc = {
      address: location.addresss,
      latitude: location.latitude,
      longitude: location.longitude
    }
    this.trigger('didUpdateLocation', loc);
  }
});