var App = window.App != null ? window.App : {};

App.ImageView = Backbone.View.extend({
   events: {
     'click #camera-select': 'getImage',
     'change #camera-input': 'fireDidUpdateImage'
   },

   template: window.JST['image'],

   initialize: function() {
     _.bindAll(this, 
      'render', 
      'getImage', 
      'renderImage',
      'fireDidUpdateImage',
      'appendImage');
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
    this.renderImage(file);
    this.trigger('didUpdateImage', file);
   },

   renderImage: function(image) {
    var reader = new FileReader();
    var gallery = this.$el.find('ul');
    var galleryItem = $("<li><a href='#' class='th'><img /></a></li>");

    reader.readAsDataURL(image);
    reader.onload = (function(item) { 
      return function(e) { 
        item.find('img').attr('src', e.target.result); 
        
      }; 
    })(galleryItem);

    gallery.append(galleryItem);
   },

   appendImage: function(url) { 
    console.log('APPEND IMAGE');
    this.$el.append("<img src=\"" + url + "\">");
   },
 });