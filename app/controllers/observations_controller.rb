class ObservationsController < ApplicationController
  def new
    puts params
    #image = params['camera-input']
    #File.open(Rails.root.join('public', 'uploads', image.original_filename), 'wb') do |file|
    #  file.write(image.read)
    #end
    address = params['adddress']
    lat = params['latitude']
    lon = params['longitude']
    tag = params['animal_identifier'].to_i
    time = params['utc_time'].to_i
    image = params['image']
    animal_id = NoBrainer.run{ |r| r.table('Wildlife').filter({:Tag => tag}).pluck('WildlifeID').coerce_to('array') }
    puts animal_id

    #"ImageURL":  "0d61d2f2-8b23-ab2a-e057-97de4ce9546a.jpeg" ,
    #"Latitude": -33.8664621021914 ,
    #"Location":  "Wylde Street, Potts Point 2011 NSW" ,
    #"Longitude": 151.2249843311973 ,
    #"Notes":  "Cockatoo with tag 082 spotted at: Wylde Street Potts Point 2011 NSW" ,
    #"SightingDate": 1396336580934 ,
    #"SightingID":  "0128b2e8-99cd-41ad-ba6d-0231e8728d55" ,
    #"SpotterID":  "716" ,
    #"WildlifeID":  "108"
  end
end
