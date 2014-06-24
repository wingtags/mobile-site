describe("Observation", function() {
  beforeEach(function() {
    this.obs = new App.Observation();
  });

  describe("Validation", function() {
    it("should return an error if tag is missing", function() {
      this.obs.set('suburb', 'Alcatraz');
      var error = this.obs.validate();

      expect(error.length).toBe(1);
      expect(this.obs.isValid()).toBe(false);
    });

    it("should not be valid if either lat/long or suburb is missing", function() {
      this.obs.set('tag', 88);
      var error = this.obs.validate();
      console.log('error', error);

      expect(error.length).toBe(1);
    });

    it("should be valid if tag, latitude and longitude are set", function() {
      this.obs.set('tag', 33);
      this.obs.set('latitude', 234);
      this.obs.set('longitude', 222);

      expect(this.obs.isValid()).toBe(true);
    });

    it("should be valid if tag and suburb are set", function() {
      this.obs.set('tag', 22);
      this.obs.set('suburb', 'asdf');

      expect(this.obs.isValid()).toBe(true);
    });
  });
});