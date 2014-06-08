var App = window.App != null ? window.App : {};

App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],

  events: {
    'keyup #suburb' : 'updateAddress', 
    'keyup #street' : 'updateAddress'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'updateAddress');
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  updateAddress: function() {
    var address = this.$el.find('#street').val() + ', ' + this.$el.find('#suburb').val();
    this.trigger('didUpdateAddress', address);
  }
});