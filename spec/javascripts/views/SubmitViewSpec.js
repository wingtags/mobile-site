describe("SubmitView", function() {
  it("Button should be disabled on initial render", function() {
    var model = new App.Observation();
    var view = new App.SubmitView({ model: model });

    var $el = view.render().$el;
    expect($el.find('input')).toHaveClass('disabled');
  });

  it("Should remain disabled until the model is valid", function() {
    var model = new App.Observation();
    var stub = sinon.stub(model, 'isValid', function() { return true; });
    var view = new App.SubmitView({ model: model });

    var $el = view.render().$el;
    model.trigger('change');
    
    expect($el.find('input')).not.toHaveClass('disabled');
  });
});