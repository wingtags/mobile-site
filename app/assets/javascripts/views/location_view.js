var App = window.App != null ? window.App : {};

App.LocationView = Backbone.View.extend({
   initialize: function(options) {
     _.bindAll(this, 
       'render',
       'renderCoordinateView',
       'renderAddressView',
       'onLocationError');

     if (options !== undefined) {
       this.locationProvider = options.locationProvider;
       this.locationProvider.on('didFailToUpdateLocation', this.onLocationError);
      }
     
     this.coordinateView = new App.CoordinateView({
       locationProvider: this.locationProvider,
       geocoder: new App.Geocoder
     });

     this.addressView = new App.AddressView();
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
     //this.coordinateView = new CoordinateView({
     //  locationProvider: this.locationProvider
     //});
     
     this.$el.append(this.coordinateView.render().el);
   },

   renderAddressView: function() {
     //this.addressView = new App.AddressView({
     //  model: new App.Address()
     //});
     this.$el.append(this.addressView.render().el);
   },

   onLocationError: function(e) {
     console.log("ON LOCATION ERROR");
     console.log("this: ", this);
     this.coordinateView.remove();
     this.renderAddressView();
   }
 });