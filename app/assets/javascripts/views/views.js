var App = window.App != null ? window.App : {};

//App.IdentifierView = Backbone.View.extend({
 // events: {
 //  'keyup #animal-identifier': 'fireDidUpdateAnimalIdentifier'
 // },

 // template: JST['animal-identifier'],

 // initialize: function() {
 //   _.bindAll(this, 'render', 'fireDidUpdateAnimalIdentifier');
 // },

 // render: function() {
 //   this.$el.html(this.template());
 //   return this;
 // },

 // fireDidUpdateAnimalIdentifier: function() {
 //  var value = $('#animal-identifier').val();
 //  this.trigger('didUpdateAnimalIdentifier', value);
 //  console.log('fire didUpdateAnimalIdentifier:' + value);
 // }
 //);


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
     console.log('imageView el: ', this.$el.find('#camera-input'));
     this.$el.find('#camera-input').click();
   },
   fireDidUpdateImage: function() {
    var file = this.$el.find('#camera-input').get(0).files[0];
    this.trigger('didUpdateImage', file);
    console.log('didUpdateImage', file);
   }
 });


App.AppView = Backbone.View.extend({
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
      'send'
    );

    if (options !== undefined) {
      this.geocoder = options.geocoder;
      this.locationProvider = options.locationProvider;
      this.imageProvider = options.imageProvider;
    };

    this.model = new App.Observation();
    this.subviews = [];
    this.locationProvider.startUpdatingLocation();
    this.initializeSubviews();
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

  initializeSubviews: function() {
    this.initializeIdentifierView();
    this.initializeLocationView();
    this.initializeImageView();
    this.initializeSubmitView();
    return this;
  },

  initializeIdentifierView: function()
  {
    var view = new App.IdentifierView();
    this.listenTo(view, 'didUpdateAnimalIdentifier', this.updateAnimalIdentifier);
    this.subviews.push(view);
  },

  initializeLocationView: function() {
    var view = new App.LocationView({ locationProvider: this.locationProvider });
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

  updateImage: function(imageEl) {
    this.model.set('image', imageEl);
  },

  preparePayload: function() {
    var data = new FormData();
    data.append('animal_identifier', this.model.get('animalIdentifier'));
    data.append('image', this.model.get('image'));
    this.send(data);
  },

  send: function(formData) {
    $.ajax({
      url: 'observations/new',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(xhr)
      {
        console.log(xhr.data);
      },
      error: function(xhr)
      {
        console.log(xhr.data);
      }
    });
  }
});


App.LocationView = Backbone.View.extend({
   initialize: function(options) {
     _.bindAll(this, 
       'render',
       'renderCoordinateView',
       'renderAddressView',
       'onLocationError');

     if (options !== undefined) {
       this.locationProvider = options.locationProvider;
       this.locationProvider.on('didFailToUpdateLocation', this.onLocationError);
      }
     
     this.coordinateView = new App.CoordinateView({
       locationProvider: this.locationProvider,
       geocoder: new App.Geocoder
     });

     this.addressView = new App.AddressView();
   },

   render: function() {
     if (this.locationProvider.isAvailable()) {
       this.renderCoordinateView();        
     } else {
       this.renderAddressView();
     }
     return this;
   },

   renderCoordinateView: function() {
     //this.coordinateView = new CoordinateView({
     //  locationProvider: this.locationProvider
     //});
     
     this.$el.append(this.coordinateView.render().el);
   },

   renderAddressView: function() {
     //this.addressView = new App.AddressView({
     //  model: new App.Address()
     //});
     this.$el.append(this.addressView.render().el);
   },

   onLocationError: function(e) {
     console.log("ON LOCATION ERROR");
     console.log("this: ", this);
     this.coordinateView.remove();
     this.renderAddressView();
   }
 });


App.CoordinateView = Backbone.View.extend({
   
   template: window.JST['location/gps'],//$('#coordinate-template').html()),
 
   initialize: function(options) {
     _.bindAll(this, 'render', 'renderPosition', 'onSuccess');

     //if (options === undefined) { throw new Error("ArgumentError: 'options' undefined.") };
     if (options !== undefined) {
      options.hasOwnProperty('locationProvider') ? this.locationProvider = options.locationProvider : console.log('CoordinateView.locationProvider missing!');
      options.hasOwnProperty('geocoder') ? this.geocoder = options.geocoder : console.log('CoordinateView.geocoder missing!');
     }
   },
   render: function() {
     this.locationProvider.getCurrentPosition().then(
       this.renderPosition,//function(position) {console.log("Position: ", position);},//this.renderPosition(position),
       this.trigger('onLocationError'),
       this.$el.html(JST['location/pending']())
     );

     return this;
   },

   renderPosition: function(position) {
    console.log("renderPosition position = ", position);
    console.log("coordinateView.geocoder: ", this.geocoder);//, this.geocoder);

    this.geocoder.reverseGeocode(position).then(
      this.onSuccess
      );

     return this;
   },

   onSuccess: function(data) {
    console.log("coordinateView.onSuccess data: ", data);
    console.log("coordinateView.geocoder: ", this.geocoder);
    var address = this.geocoder.getAddressForPosition(data);
    var addressString = { addressString: address.get('suburb') + ', ' + address.get('stateAbbrev') };
    $(this.el).html(JST['location/geocoded-address'](addressString));

   }
 });


App.AddressView = Backbone.View.extend({
  template: window.JST['location/address'],//$("#address-template").html()),

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});


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

