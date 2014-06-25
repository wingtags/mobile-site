var App = window.App != null ? window.App : {};

App.SubmitView = Backbone.View.extend({
  template: JST['submit'],

  events: {
     'click #submit': 'handleSubmit'
  },
  
  initialize: function() {
    _.bindAll(
      this,
      'render',
      'handleSubmit',
      'toggleButton'
    );

    if (!(_.isUndefined(this.model))) {
      console.log('model: ', this.model);
      this.listenTo(this.model, 'change', this.toggleButton);
    }
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  toggleButton: function() {
    var button = this.$el.find('input');
    if (this.model.isValid()) {
      this.isSubmittable = true;
      button.removeClass('disabled');
    } else {
      this.isSubmittable = false;
      button.addClass('disabled');
    }
  },

  handleSubmit: function(event)
  {
    event.preventDefault();
    if (this.isSubmittable) { this.trigger('sendForm'); }
  }
});