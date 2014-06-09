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
    //if (options === undefined) { throw new Error("ArgumentError: 'options' undefined.") };
    if (options !== undefined) {
     options.hasOwnProperty('locationProvider') ? this.locationProvider = options.locationProvider : console.log('CoordinateView.locationProvider missing!');
     options.hasOwnProperty('geocoder') ? this.geocoder = options.geocoder : console.log('CoordinateView.geocoder missing!');
     if (options.hasOwnProperty('geocodingProvider')) { this.geocodingProvider = options.geocodingProvider; }
    }
    this.positionPromise = this.locationProvider.getCurrentPosition();
  },

  validateOptions: function(options) {
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
   console.log("renderPosition position = ", position);
   console.log("coordinateView.geocoder: ", this.geocoder);//, this.geocoder);
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