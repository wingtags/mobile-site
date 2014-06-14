var App = window.App != null ? window.App : {};

App.ImageView = Backbone.View.extend({
   events: {
     'click #camera-select': 'getImage',
     'change #camera-input': 'fireDidUpdateImage'
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
     this.$el.find('#camera-input').click();
   },
   fireDidUpdateImage: function() {
    var file = this.$el.find('#camera-input').get(0).files[0];
    this.trigger('didUpdateImage', file);
   }
 });