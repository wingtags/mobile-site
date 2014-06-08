describe("AddressView", function() {

  beforeEach(function() {
    this.view = new App.AddressView();
    this.$el = this.view.render().$el;
  });

  it("should render a suburb field", function() {
    expect(this.$el).toContainElement('#suburb');
  });

  it("should render a street field", function() {
    expect(this.$el).toContainElement('#street');
  });

  it("should trigger a didUpdateAddress event on suburb or street entry", function() {
    var spy = sinon.spy();
    this.view.on('didUpdateAddress', spy);

    this.$el.find('#suburb').val('Bondi').keyup();
    this.$el.find('#street').val('Campbell Parade').keyup();

    expect(spy.calledWith('Campbell Parade, Bondi')).toBeTruthy();
  });
});