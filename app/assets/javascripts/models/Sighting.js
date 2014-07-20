var App = window.App != null ? window.App : {};

App.Sighting = Backbone.Model.extend({
  idAttribute: "SightingID",

  initialize: function() {
    _.bindAll(
      this,
      'toGeoJSON',
      '_parseImageURL',
      '_isInvalidUrl'),

    this.on('change', this._parseImageURL);
  },

  parse: function(data, options) {
    console.log("Enter parse method: ", data);
    var url = data.ImageURL;
    console.log("ImageURL: ", url);
    data.ImageURL = this._parseImageURL(url);
    console.log("Exiting parse method: ", data);
    return data;
  },
  
  toGeoJSON: function() {
    geoJson = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [this.attributes.Longitude, this.attributes.Latitude]
        },
      properties: {
        name: this.attributes.Animal.Name,
        sightingDate: this.attributes.SightingDate,
        thumb: this.attributes.ImageURL,
        animal: "http://api.wingtags.com/wildlife/?tag=" + this.attributes.Animal.Tag
      }
    }
    return geoJson;
  },

  _parseImageURL: function(url) {
    var validUrl = "https://wingtags-syd.s3.amazonaws.com/images/cockatoo_profile_placeholder_2x";

    if ((! _.isUndefined(url)) && (! this._isInvalidUrl(url))) {
      validUrl = url;
    }

    return validUrl;
  },

  _isInvalidUrl: function(url) {
    var invalidUrls = ["[url]", "", "undefined"];
    var invalidMatches = _.intersection([url], invalidUrls);
    var isInvalid = invalidMatches.length > 0 ? true : false;
    return isInvalid;
  }
});