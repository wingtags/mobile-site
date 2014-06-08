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
  }
});