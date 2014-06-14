var App = window.App != null ? window.App : {};

App.CoordinateView = Backbone.View.extend({
   
  template: window.JST['location/gps'],

  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'renderPosition', 
      'onSuccess',
      'validateOptions',
      'getValueForAttribute',
      'getAddressForPosition');

    this.validateOptions(options);
    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.geocoder = options.geocoder;
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
    this.loc.latitude = position.coords.latitude;
    this.loc.longitude = position.coords.longitude;

    this.geocodingProvider.reverseGeocode(position)
      .then(
        this.onSuccess
      );
    return this;
  },

  // OBSOLETE - REMOVE
  renderPosition: function(position) {
    this.geocodingProvider.reverseGeocode(position).then(
      this.onSuccess
      );
    return this;
  },

  onSuccess: function(data) {
    this.loc.address = data.results[0].formatted_address;
    var suburb = this.getValueForAttribute(data, 'long_name', 'locality');
    var street = this.getValueForAttribute(data, 'long_name', 'route');
    this.$el.html(JST['location/geocoded-address']({ addressString: street + ', ' + suburb }));
    this.notify(this.loc);
  },

  notify: function(location) {
    this.trigger('didUpdateLocation', location);
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