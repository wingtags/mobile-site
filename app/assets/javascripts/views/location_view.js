var App = window.App != null ? window.App : {};

App.LocationView = Backbone.View.extend({

  initialize: function(options) {
    _.bindAll(this, 
      'render',
      'renderCoordinateView',
      'renderAddressView',
      'onLocationError',
      '_validateOptions',
      'renderPending',
      'prepareCoordinateView'
    );

    this._validateOptions(options);
    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.locationProvider.on('didFailToUpdateLocation', this.onLocationError);

    this.location_promise = this.locationProvider.getCurrentPosition();
    //this.p_location.then(
    //  
    //)
        
    
  },

  _validateOptions: function(options) {
    if (typeof options === "undefined") { throw new TypeError("Options must be supplied"); };
    if (typeof options.locationProvider === "undefined") { throw new TypeError("A LocationProvider must be supplied"); };
    if (typeof options.geocodingProvider === "undefined") { throw new TypeError("A GeocodingProvider must be supplied"); };
  },

  render: function() {
    this.renderPending();

    this.location_promise.then(
      this.prepareCoordinateView,
      this.renderAddressView
    );
    
    return this;
  },

  prepareCoordinateView: function(position) {
    var latlng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    
    this.geocodingProvider.reverseGeocode(latlng).then(
      this.renderCoordinateView,
      this.renderAddressView
    );
  },

  renderCoordinateView: function() {
    this.coordinateView = new App.CoordinateView({
      locationProvider: this.locationProvider,
      geocodingProvider: this.geocodingProvider
    });

    this.listenTo(this.coordinateView, 'didUpdateCoordinates', this.updateLocation);
    this.$el.html(this.coordinateView.render().el);
  },

  renderAddressView: function() {
    this.addressView = new App.AddressView();
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