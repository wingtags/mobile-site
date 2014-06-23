class ObservationsController < ApplicationController
  require 'securerandom'
  require 'aws-sdk-core'

  def show
    @observation = NoBrainer.run{ |r| r.table('Sighting').get(params[:id]) }
    puts 'observation:'
    puts @observation

    @animal = NoBrainer.run{ |r| r.table('Wildlife').get(@observation['WildlifeID']) }
    puts 'animal'
    puts @animal

    @result = Jbuilder.encode do |json|
      json.observations [@observation] do |o|
        json.id o['SightingID']
        json.latitude o['Latitude']
        json.longitude o['Longitude']
        json.address o['Location']
        json.timestamp o['SightingDate']
        json.links do
          json.animal o['WildlifeID']
          json.observer o['SpotterID']
        end
        json.linked do
          json.animals [@animal] do |a|
            json.id a['WildlifeID']
            json.colour a['Colour']
            json.capture_date a['CreatedDate']
            json.gender a['Gender']
            json.name a['Name']
            json.notes a['Notes']
            json.tag a['Tag']
          end
        end
      end
    end

    respond_to do |format|
      format.json { render :json => @result }
      format.html { render :json => @result }
    end
  end

  def create
    tag = params['animal_identifier'].to_i

    animal_cursor = NoBrainer.run{ |r| r.table('Wildlife').filter({:Tag => tag}) }
    animal = animal_cursor.first

    image = params['image']
    puts 'image:'
    puts image
    file_name = image == "undefined" ? "" : SecureRandom.uuid + File.extname(image.original_filename)

    #s3 = Aws::S3.new
    #resp = s3.put_object(
    #{
    #    bucket: 'wingtags-syd',
    #    body: image,
    #    key: file_name
    #})
    

    out = NoBrainer.run{ |r| r.table('Sighting').insert(
      {
        'Location' => params['address'],
        'Latitude' => params['latitude'].to_f,
        'Longitude' => params['longitude'].to_f,
        'WildlifeID' => animal['WildlifeID'].to_i,
        'SightingDate' => params['utc_time'].to_i,
        'SpotterID' => 101,
        'ImageUrl' => file_name
      }, :return_vals => true) 
    }

    @in = [out['new_val']]

    @result = Jbuilder.encode do |json|
      json.observations @in do |o|
        json.id o['SightingID']
        json.latitude o['Latitude']
        json.longitude o['Longitude']
        json.address o['Location']
        json.timestamp o['SightingDate']
        json.links do
          json.animal o['WildlifeID']
          json.observer o['SpotterID']
        end
      end
    end

    respond_to do |format|
        format.json { render :json => @result }
    end
  end
end
