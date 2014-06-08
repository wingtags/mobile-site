var App = window.App != null ? window.App : {};

App.IdentifierView = Backbone.View.extend({
  template: JST['animal-identifier'],

  events: {
   'keyup #animal-identifier': 'fireDidUpdateAnimalIdentifier'
  },
  
  initialize: function() {
    _.bindAll(this, 'render', 'fireDidUpdateAnimalIdentifier');
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  fireDidUpdateAnimalIdentifier: function() {
   var value = $('#animal-identifier').val();
   this.trigger('didUpdateAnimalIdentifier', value);
  }
});