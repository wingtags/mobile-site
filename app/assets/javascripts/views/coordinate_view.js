var App = window.App != null ? window.App : {};

App.CoordinateView = Backbone.View.extend({
   
  template: window.JST['location/gps'],

  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'renderPosition', 
      'renderAddress',
      'validateOptions',
      'getValueForAttribute',
      'getAddressForPosition',
      'handleGeocodingFailure');

    this.validateOptions(options);
    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.loc = {};
    this.positionPromise = this.locationProvider.getCurrentPosition();
  },

  validateOptions: function(options) {
    if (typeof options === "undefined") { throw new Error("Options must be supplied"); };
    if (typeof options.locationProvider === "undefined") { throw new Error("A LocationProvider must be supplied"); };
    if (typeof options.geocodingProvider === "undefined") { throw new Error("A geocodingProvider must be supplied"); };
  },

  render: function() {
    this.positionPromise.then(
      this.getAddressForPosition,
      this.trigger('onLocationError'),
      this.$el.html(JST['location/pending']())
    );
    return this;
  },

  getAddressForPosition: function(position) {
    var latlng = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    this.loc.latitude = latlng.latitude;
    this.loc.longitude = latlng.longitude;

    this.geocodingProvider.reverseGeocode(latlng).then(
      this.renderAddress,
      this.handleGeocodingFailure
    );
  },

  // OBSOLETE - REMOVE
  renderPosition: function(position) {
    this.geocodingProvider.reverseGeocode(position).then(
      this.renderAddress
      );
    return this;
  },

  renderAddress: function(data) {
    this.loc.address = data.results[0].formatted_address;
    var suburb = this.getValueForAttribute(data, 'long_name', 'locality');
    var street = this.getValueForAttribute(data, 'long_name', 'route');
    this.$el.html(JST['location/geocoded-address']({ addressString: street + ', ' + suburb }));
    this.notify(this.loc);
  },

  notify: function(location) {
    this.trigger('didUpdateLocation', location);
  },

  handleGeocodingFailure: function(error) {
    this.$el.find('span#gps-status').text("Location acquired.");
    var location = {
      latitude: this.loc.latitude,
      longitude: this.loc.longitude,
      address: ""
    };
    this.notify(location);
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