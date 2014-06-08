var App = window.App != null ? window.App : {};

App.SubmitView = Backbone.View.extend({
  template: JST['submit'],

  events: {
     'click #submit': 'handleSubmit'
  },
  
  initialize: function() {
    _.bindAll(this, 'render', 'handleSubmit');
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  handleSubmit: function(event)
  {
    event.preventDefault();
    this.trigger('sendForm');
    console.log('Click submit');
    
    //var file = document.getElementById('camera-input');
    //var tag = document.getElementById('animal-identifier');
//
    //var form = new FormData();
    //form.append('image', file.files[0]);
    //form.append('identifier', tag);
    //$.ajax({
    //  url: 'observations/new',
    //  type: 'POST',
    //  data: form,
    //  processData: false,
    //  contentType: false,
    //  success: function(xhr)
    //  {
    //    console.log(xhr.data);
    //  },
    //  error: function(xhr)
    //  {
    //    console.log(xhr.data);
    //  }
    //});
  }
});