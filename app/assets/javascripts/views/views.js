var App = window.App != null ? window.App : {};

App.IdentifierView = Backbone.View.extend({
   //template: window.JST['animal-identifier'],
   template: JST['animal-identifier'],
   initialize: function() {
     _.bindAll(this, 'render');
   },
   render: function() {
     this.$el.html(this.template());
     return this;
   }
 });


App.ImageView = Backbone.View.extend({
   events: {
     'click #camera-select': 'getImage'
   },
   template: window.JST['image'],
   initialize: function() {
     _.bindAll(this, 'render', 'getImage');
   },
   render: function() {
     this.$el.html(this.template());
     return this;
   },
   getImage: function(event) {
     event.preventDefault();
     console.log('imageView el: ', this.$el.find('#camera-input'));
     this.$el.find('#camera-input').click();
   }
 });


App.AppView = Backbone.View.extend({
   tagName: 'form', 
   attributes: { 'method':'POST', 'ENCTYPE':'multipart/form-data', 'ACTION':'/new'},
   initialize: function(options) {
     _.bindAll(this, 
       'render', 
       'renderSubview',
       'initializeSubviews',
       'initializeLocationView',
       'initializeImageView');

    if (options !== undefined) {
      this.geocoder = options.geocoder;
      this.locationProvider = options.locationProvider;
      this.imageProvider = options.imageProvider;
    };
     this.subviews = [];
     this.locationProvider.startUpdatingLocation();
     this.initializeSubviews();
   },
   render: function() {
     this.subviews.forEach(this.renderSubview);
     this.$el.append(JST['submit']());
     return this;
   },
   renderSubview: function(subview, index, array) {
     var el = subview.render().el;
     this.$el.append(el);
   },
   initializeSubviews: function() {
     this.subviews.push(new App.IdentifierView());
     this.initializeLocationView();
     this.initializeImageView();
   },
   initializeLocationView: function() {
     var view = new App.LocationView({ locationProvider: this.locationProvider });
     this.subviews.push(view);
   },
   initializeImageView: function() {
     if (this.imageProvider.isAvailable()) {
       this.subviews.push(new App.ImageView());
     }
   }
 });


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


App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],//$("#address-template").html()),

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});

