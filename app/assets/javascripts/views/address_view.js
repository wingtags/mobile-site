var App = window.App != null ? window.App : {};

App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],

  events: {
    'keyup #suburb' : 'updateAddress',
    'keyup #suburb' : '_setSuburb',
    'keyup #street' : 'updateAddress',
    'keyup #street' : '_setStreet'
  },


  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'updateAddress',
      '_validateOptions',
      '_setSuburb',
      '_setStreet');

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
  },


  _setSuburb: function(event) {
    this.model.set('suburb', event.target.value);
  },


  _setStreet: function(event) {
    this.model.set('street', event.target.value);
  }
});