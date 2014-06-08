describe("IdentifierView", function() {

  beforeEach(function() {
    this.identifierView = new App.IdentifierView();
  });

  describe("render()", function() {
    it("should contain an input#animal-identifier field", function() {
      var el = this.identifierView.render().el;
      expect(el).toContainElement('input#animal-identifier');
    });

    it("should return itself", function() {
      var obj = this.identifierView.render();
      expect(obj).toBe(this.identifierView);
    });
  });

  describe("On input", function() {
    it("should fire a didUpdateAnimalIdentifier event", function() {
      var spy = sinon.spy();
      this.identifierView.on('didUpdateAnimalIdentifier', spy);

      var $el = this.identifierView.render().$el;
      $el.find('#animal-identifier').val(22).trigger('keyup');

      expect(spy.called).toBe(true);
    });
  });
});