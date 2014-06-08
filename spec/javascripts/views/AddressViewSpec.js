describe("AddressView", function() {

  beforeEach(function() {
    this.$view = new App.AddressView().render().$el;
  });

  it("Renders a suburb field", function() {
    expect(this.$view).toContainElement('#suburb');
  });

  it("Renders a street field", function() {
    expect(this.$view).toContainElement('#street');
  });
});