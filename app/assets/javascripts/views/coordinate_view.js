var App = window.App != null ? window.App : {};

App.CoordinateView = Backbone.View.extend({
   
  template: window.JST['location/gps'],

  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'renderPosition', 
      'onSuccess',
      'validateOptions');

    this.validateOptions(options);
    this.locationProvider = options.locationProvider;
    this.geocodingProvider = options.geocodingProvider;
    this.geocoder = options.geocoder;

    this.positionPromise = this.locationProvider.getCurrentPosition();
  },

  validateOptions: function(options) {
    console.log('validation options: ', options);
    if (typeof options === "undefined") { throw new Error("Options must be supplied"); };
    if (typeof options.locationProvider === "undefined") { throw new Error("A LocationProvider must be supplied"); };
    if (typeof options.geocodingProvider === "undefined") { throw new Error("A geocodingProvider must be supplied"); };
  },

  render: function() {
    this.positionPromise.then(
      this.renderPosition,
      this.trigger('onLocationError'),
      this.$el.html(JST['location/pending']())
    );
    return this;
  },

  renderPosition: function(position) {
    //console.log("renderPosition position = ", position);
    //console.log("coordinateView.geocoder: ", this.geocoder);//, this.geocoder);
    console.log('renderPosition context: ', this);
    console.log('renderPosition geocodingProvider: ', this.geocodingProvider);
    this.geocodingProvider.reverseGeocode(position).then(
      this.onSuccess
      );
    return this;
  },

  onSuccess: function(data) {
    // create position object
    // fire didUpdatePosition
    // render UI
   console.log("coordinateView.onSuccess data: ", data);
   console.log("coordinateView.geocoder: ", this.geocoder);
   var address = this.geocoder.getAddressForPosition(data);
   var addressString = { addressString: address.get('suburb') + ', ' + address.get('stateAbbrev') };
   $(this.el).html(JST['location/geocoded-address'](addressString));
  }
});