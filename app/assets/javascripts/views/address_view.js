var App = window.App != null ? window.App : {};

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