describe("ImageView", function() {

  beforeEach(function() {
    this.imageView = new App.ImageView();
  });

  describe("render()", function() {

    it("should render an input#camera-input element", function() {
      var el = this.imageView.render().el;
      expect(el).toContainElement('input#camera-input');
    });

    it("should render an a#camera-select element with class 'button'", function() {
      var el = this.imageView.render().el;
      expect(el).toContainElement('a#camera-select');
      expect($(el).find('a#camera-select')).toHaveClass('button');
    });

    it("should return itself", function() {
      var obj = this.imageView.render();
      expect(obj).toBe(this.imageView);
    });
  });


  describe("when 'Add Photo' is clicked", function() {
    it("should fire a click event on the input element", function() {
      var $el = this.imageView.render().$el;
      var spyEvent = spyOnEvent($el.find('#camera-input'), 'click');

      $el.find('#camera-select').click();
      expect(spyEvent).toHaveBeenTriggered();
    });
  });


  describe('When an image is selected', function() {
    it('should fire a didUpdateImage event', function() {
      var spy = sinon.spy();
      this.imageView.on('didUpdateImage', spy);

      var $input = this.imageView.render().$el.find('#camera-input').change();

      expect(spy.called).toBe(true);
    });

    it('should append an img element', function() {
      var $el = this.imageView.render().$el;
      $el.find('#camera-input').change();

      expect($el).toContainElement('img');
    });
  });
});