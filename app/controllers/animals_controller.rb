class AnimalsController < ApplicationController
  def index
    @animals = Animal.all
    logger.debug "Animals: #{@animals.count}"
  end
end
