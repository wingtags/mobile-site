var App = window.App != null ? window.App : {};

App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],

  events: {
    'keyup #suburb' : '_setSuburb',
    'keyup #street' : '_setStreet'
  },


  initialize: function(options) {
    _.bindAll(this,
      'render',   
      '_validateOptions',
      '_setSuburb',
      '_setStreet',
      '_setAddress'
    );

    this._validateOptions(options);
  },


  render: function() {
    $(this.el).html(this.template());
    return this;
  },


  _validateOptions: function(options) {
    if (typeof options === "undefined") { throw new Error("Options must be supplied"); };
    if (typeof options.model === "undefined") { throw new Error("A model object must be supplied"); };

    this.model = options.model;
  },


  _setSuburb: function(event) {
    this.model.set('suburb', event.target.value);
    this._setAddress();
  },


  _setStreet: function(event) {
    this.model.set('street', event.target.value);
    this._setAddress();
  },

  _setAddress: function() {
    var address = this.model.get('street') + ', ' + this.model.get('suburb');
    this.model.set('address', address);
  }
});