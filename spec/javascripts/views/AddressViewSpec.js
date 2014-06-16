describe("AddressView", function() {

  beforeEach(function() {
    this.model = new App.Observation();
    this.view = new App.AddressView({ model: this.model });
    this.$el = this.view.render().$el;
  });

  it("should raise an exception if a model object is not supplied", function() {
    var constructorFn = function() { new App.AddressView; };
    expect(constructorFn).toThrow();
  });

  it("should render a suburb field", function() {
    expect(this.$el).toContainElement('#suburb');
  });

  it("should render a street field", function() {
    expect(this.$el).toContainElement('#street');
  });

  it("should set the suburb property of the model on input", function() {
    this.$el.find('#suburb').val('Bondi').keyup();
    expect(this.model.get('suburb')).toBe('Bondi');
  });

  it("should set the street property of the model on input", function() {
    this.$el.find('#street').val('Campbell Parade').keyup();
    expect(this.model.get('street')).toBe('Campbell Parade');
  });

  it("should trigger a didUpdateAddress event on suburb or street entry", function() {
    var spy = sinon.spy();
    this.view.on('didUpdateAddress', spy);

    this.$el.find('#suburb').val('Bondi').keyup();
    this.$el.find('#street').val('Campbell Parade').keyup();

    expect(spy.calledWith('Campbell Parade, Bondi')).toBeTruthy();
  });
});