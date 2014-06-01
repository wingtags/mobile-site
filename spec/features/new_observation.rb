require 'spec_helper'

describe "stuff" do
  before(:each) do
    Capybara.current_driver = :webkit
  end

  describe "observation form", :js => true, :type => :feature do
    it "submits" do
      page.driver.accept_js_prompts!
      visit '/'
      fill_in 'animal-identifier', :with => 1
      fill_in 'suburb', :with => 'Monkey'
      click_link 'Submit'
      expect(page).to have_content 'Success'
    end
  end
end
