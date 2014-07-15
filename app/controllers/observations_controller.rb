class ObservationsController < ApplicationController
  require 'securerandom'
  require 'aws-sdk-core'
  require 'rest_client'

  wrap_parameters :observations, :include => [:address]

  # pointless comment

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

    #@observations = params['observations']
    #@observations.each do |k, v|
    #  @observation = v
    #end


    
    
    logger.debug "=== New observation ==="
    logger.debug "Params: #{params}"

    tag = params['tag'].to_i
    animal_cursor = NoBrainer.run{ |r| r.table('Wildlife').filter({:Tag => tag}) }
    @animal = animal_cursor.first

    logger.debug "Animal with tag #{tag}: #{@animal.to_s}"

    image = params['image']
    file_name = nil

    if not ["", "undefined"].include? image
      #file_name = image ? SecureRandom.uuid + File.extname(image.original_filename) : ""
      #file_name = 'images/' + file_name
      #logger.debug "File name: #{file_name}"

      response = RestClient.post 'http://api.wingtags.com/image', :img => image
      body = JSON.parse response.body
      file_name = body['File']

      #s3 = Aws::S3.new
      #resp = s3.put_object(
      #{
      #    bucket: 'wingtags-syd',
      #    body: image,
      #    key: file_name
      #})
    end
    
    

    out = NoBrainer.run{ |r| r.table('Sighting').insert(
      {
        'Location' => params['address'],
        'Latitude' => params['latitude'].to_f,
        'Longitude' => params['longitude'].to_f,
        'WildlifeID' => @animal['WildlifeID'].to_s,
        'SightingDate' => params['timestamp'].to_i,
        'SpotterID' => "1422868a-9676-4bb9-ac7c-2d51d0981b51",
        'ImageURL' => file_name
      }, :return_vals => true) 
    }

    logger.debug "New Observation record: #{out}"

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

    respond_to do |format|
      format.json { render :json => @result }
    end
  end
end
