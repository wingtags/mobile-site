class ObservationsController < ApplicationController
  def new
    puts params
    image = params['camera-input']
    File.open(Rails.root.join('public', 'uploads', image.original_filename), 'wb') do |file|
      file.write(image.read)
    end
  end
end
