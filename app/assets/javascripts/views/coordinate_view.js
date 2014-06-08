var App = window.App != null ? window.App : {};

App.CoordinateView = Backbone.View.extend({
   
   template: window.JST['location/gps'],//$('#coordinate-template').html()),
 
   initialize: function(options) {
     _.bindAll(this, 'render', 'renderPosition', 'onSuccess');

     //if (options === undefined) { throw new Error("ArgumentError: 'options' undefined.") };
     if (options !== undefined) {
      options.hasOwnProperty('locationProvider') ? this.locationProvider = options.locationProvider : console.log('CoordinateView.locationProvider missing!');
      options.hasOwnProperty('geocoder') ? this.geocoder = options.geocoder : console.log('CoordinateView.geocoder missing!');
     }
   },
   render: function() {
     this.locationProvider.getCurrentPosition().then(
       this.renderPosition,//function(position) {console.log("Position: ", position);},//this.renderPosition(position),
       this.trigger('onLocationError'),
       this.$el.html(JST['location/pending']())
     );

     return this;
   },

   renderPosition: function(position) {
    console.log("renderPosition position = ", position);
    console.log("coordinateView.geocoder: ", this.geocoder);//, this.geocoder);

    this.geocoder.reverseGeocode(position).then(
      this.onSuccess
      );

     return this;
   },

   onSuccess: function(data) {
    console.log("coordinateView.onSuccess data: ", data);
    console.log("coordinateView.geocoder: ", this.geocoder);
    var address = this.geocoder.getAddressForPosition(data);
    var addressString = { addressString: address.get('suburb') + ', ' + address.get('stateAbbrev') };
    $(this.el).html(JST['location/geocoded-address'](addressString));

   }
 });