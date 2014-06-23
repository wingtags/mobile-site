var App = window.App != null ? window.App : {};

App.FormView = Backbone.View.extend({
  tagName: 'form', 

  attributes: { 'method':'POST', 'ENCTYPE':'multipart/form-data', 'ACTION':'/observations/new'},

  initialize: function(options) {
    _.bindAll(this, 
      'render', 
      'renderSubview',
      'initializeSubviews',
      'initializeIdentifierView',
      'initializeLocationView',
      'initializeImageView',
      'initializeSubmitView',
      'updateAnimalIdentifier',
      'updateImage',
      'preparePayload',
      'send',
      'removeSubviews',
      'renderThanks'
    );

    if (options !== undefined) {
      this.geocodingProvider = options.geocodingProvider;
      this.locationProvider = options.locationProvider;
      this.imageProvider = options.imageProvider;
    };

    this.model = new App.Observation();
    this.subviews = [];
    this.initializeSubviews();
  },

  initializeSubviews: function() {
    this.initializeIdentifierView();
    this.initializeLocationView();
    this.initializeImageView();
    this.initializeSubmitView();
    return this;
  },

  initializeIdentifierView: function() {
    var view = new App.IdentifierView();
    this.listenTo(view, 'didUpdateAnimalIdentifier', this.updateAnimalIdentifier);
    this.subviews.push(view);
  },

  initializeLocationView: function() {
    var view = new App.LocationView({ 
      locationProvider: this.locationProvider,
      geocodingProvider: this.geocodingProvider,
      model: this.model
    });
    this.listenTo(view, 'didUpdateLocation2', this.updateLocation);
    this.subviews.push(view);
  },

  initializeImageView: function() {
    if (this.imageProvider.isAvailable()) {
      var view = new App.ImageView();
      this.listenTo(view, 'didUpdateImage', this.updateImage);
      this.subviews.push(view);
    }
  },

  initializeSubmitView: function() {
    var view = new App.SubmitView();
    this.listenTo(view, 'sendForm', this.preparePayload);
    this.subviews.push(view);
  },

  render: function() {
    this.subviews.forEach(this.renderSubview);
    this.addCsrfToken();
    return this;
  },

  renderSubview: function(subview, index, array) {
    var el = subview.render().el;
    this.$el.append(el);
  },





  addCsrfToken: function() {
     var token = $("meta[name='csrf-token']").attr('content');
     this.$el.append("<input type='hidden' name='authenticity_token' value='" + token + "'>");
  },

  updateAnimalIdentifier: function(newIdentifier) {
    this.model.set('animalIdentifier', newIdentifier);
  },

  updateAddress: function(address) {
    var addr = address.results[0].formatted_address;
    this.model.set('address', addr);
  },

  updatePosition: function(geoposition) {
    var lat = geoposition.coords.latitude;
    var lon = geoposition.coords.longitude;

    this.model.set('latitude', lat);
    this.model.set('longitude', lon);
  },

  updateLocation: function(location) {

  },

  updateImage: function(imageEl) {
    this.model.set('image', imageEl);
  },

  preparePayload: function() {
    var data = new FormData();
    data.append('animal_identifier', this.model.get('animalIdentifier'));
    data.append('address', this.model.get('address'));
    data.append('latitude', this.model.get('latitude'));
    data.append('longitude', this.model.get('longitude'));
    data.append('image', this.model.get('image'));
    data.append('utc_time', new Date().getTime());
    this.send(data);
  },

  removeSubviews: function() {
    this.subviews.forEach(
      function(view) { 
        view.remove(); 
      }
    );
  },

  renderThanks: function(data) {
    this.removeSubviews();
    var animal_id = data.observations[0].links.animal;
    this.$el.html(JST['thanks']({name: 'Louiz'}));
  },

  send: function(formData) {
    var promise = $.ajax({
      url: 'observations',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false
    });

    promise.done( this.renderThanks );
  }
});













