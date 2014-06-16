var App = window.App != null ? window.App : {};


App.Router = Backbone.Router.extend({
  routes: { '': 'home' },

  initialize: function() {
    this.formView = new App.FormView({
      locationProvider: new App.LocationProvider(),
      imageProvider:    new App.ImageProvider(),
      geocodingProvider: new App.GeocodingProvider()
    });
  },

  home: function() {
    $('#app-container').empty();
    $('#app-container').append(this.formView.render().el);
  }
});