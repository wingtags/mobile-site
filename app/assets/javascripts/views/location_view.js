var App = window.App != null ? window.App : {};

App.LocationView = Backbone.View.extend({

  initialize: function(options) {
    _.bindAll(this, 
      'render',
      'renderCoordinateView',
      'renderAddressView',
      'onLocationError',
      '_processOptions',
      'renderPending',
      'prepareCoordinateView'
    );

    this._processOptions(options);
    
  },

  _processOptions: function(options) {
    if (typeof options === "undefined") { throw new TypeError("Options must be supplied"); };
    if (typeof options.locationProvider === "undefined") { throw new TypeError("A LocationProvider must be supplied"); };
    if (typeof options.geocodingProvider === "undefined") { throw new TypeError("A GeocodingProvider must be supplied"); };
    //Reinstate this later
    //if (typeof options.model === "undefined") { throw new TypeError("An Observation model must be supplied"); };

    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.model = options.model || new App.Observation;
    this.locationProvider.on('didFailToUpdateLocation', this.onLocationError);
    this.location = {};
  },

  render: function() {
    this.renderPending();

    this.locationProvider.getCurrentPosition().then(
      this.prepareCoordinateView,
      this.renderAddressView
    );

    return this;
  },

  prepareCoordinateView: function(position) {
    var latlng = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    this.location.latitude = latlng.latitude;
    this.location.longitude = latlng.longitude;

    this.model.set('latitude', latlng.latitude);
    this.model.set('longitude', latlng.longitude);
    
    this.geocodingProvider.reverseGeocode(latlng).then(
      this.renderCoordinateView,
      this.renderAddressView
    );
  },

  renderCoordinateView: function(address) {
    this.coordinateView = new App.CoordinateView({
      locationProvider: this.locationProvider,
      geocodingProvider: this.geocodingProvider
    });

    this.location.address = address.results[0].formatted_address;
    this.model.set('address', address.results[0].formatted_address);

    this.listenTo(this.coordinateView, 'didUpdateCoordinates', this.updateLocation);
    this.$el.html(this.coordinateView.render().el);
  },

  renderAddressView: function() {
    this.addressView = new App.AddressView({ model: this.model });
    this.listenTo(this.addressView, 'didUpdateAddress', this.updateAddress);
    this.$el.html(this.addressView.render().el);
  },

  renderPending: function() {
    this.$el.html(JST['location/pending']())
    console.log('render pending: ', this);
  },

  onLocationError: function(e) {
    console.log("ON LOCATION ERROR");
    console.log("this: ", this);
    //this.coordinateView.remove();
    this.renderAddressView();
  },

  updateAddress: function(address) {
    this.location.address = address;
    this.trigger('didUpdateLocation', this.location);
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