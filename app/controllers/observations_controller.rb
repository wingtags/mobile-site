class ObservationsController < ApplicationController
  require 'securerandom'

  def new
    tag = params['animal_identifier'].to_i
    cursor = NoBrainer.run{ |r| r.table('Wildlife').filter({:Tag => tag}) }
    animal = cursor.first

    #if animal.empty? error = "We haven't tagged a cockatoo with that number. Try again?"


    puts tag
    puts animal
    puts '---------------'
    #image = params['camera-input']
    #File.open(Rails.root.join('public', 'uploads', image.original_filename), 'wb') do |file|
    #  file.write(image.read)
    #end
    address = params['adddress']
    lat = params['latitude']
    lon = params['longitude']
    
    time = params['utc_time'].to_i
    image = params['image']

    
    animal_id = animal['WildlifeID']

    out = NoBrainer.run{ |r| r.table('Sighting').insert(
      {
        'Location' => address,
        'Latitude' => lat,
        'Longitude' => lon,
        'WildlifeId' => animal_id,
        'SpotterID' => 101,
        'ImageUrl' => SecureRandom.uuid
      }, :return_vals => true) 
    }

    puts '---------------'
    puts animal

    #"ImageURL":  "0d61d2f2-8b23-ab2a-e057-97de4ce9546a.jpeg" ,
    #"Latitude": -33.8664621021914 ,
    #"Location":  "Wylde Street, Potts Point 2011 NSW" ,
    #"Longitude": 151.2249843311973 ,
    #"Notes":  "Cockatoo with tag 082 spotted at: Wylde Street Potts Point 2011 NSW" ,
    #"SightingDate": 1396336580934 ,
    #"SightingID":  "0128b2e8-99cd-41ad-ba6d-0231e8728d55" ,
    #"SpotterID":  "716" ,
    #"WildlifeID":  "108"

    respond_to do |format|
        format.json { render :json => animal }
    end
  end
end
