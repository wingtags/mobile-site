describe("Observation", function() {
  beforeEach(function() {
    this.obs = new App.Observation();
  });

  describe("Validation", function() {
    it("should return an error if tag is missing", function() {
      this.obs.set('suburb', 'Alcatraz');
      var error = this.obs.validate();

      expect(error.length).toBe(1);
      console.log('error: ', error);
    });

    it("should return an error if either lat/long or suburb is missing", function() {
      this.obs.set('tag', 88);
      var error = this.obs.validate();

      expect(error.length).toBe(1);
    });
  });
});