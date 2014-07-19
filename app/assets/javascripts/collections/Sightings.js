var App = window.App != null ? window.App : {};

App.Sightings = Backbone.Collection.extend({
  url: "http://api.wingtags.com/sighting/?n=25",
  model: App.Sighting
});