var App = window.App != null ? window.App : {};

App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],

  events: {
    'keyup #suburb' : 'updateAddress', 
    'keyup #street' : 'updateAddress'
  },

  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'updateAddress',
      '_validateOptions');

    this._validateOptions(options);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  updateAddress: function() {
    var address = this.$el.find('#street').val() + ', ' + this.$el.find('#suburb').val();
    this.trigger('didUpdateAddress', address);
  },

  _validateOptions: function(options) {
    if (typeof options === "undefined") { throw new Error("Options must be supplied"); };
    if (typeof options.model === "undefined") { throw new Error("A model object must be supplied"); };

    this.model = options.model;
  }
});