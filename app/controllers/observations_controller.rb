class ObservationsController < ApplicationController
  require 'securerandom'
  require 'aws-sdk-core'

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
    # This is a hack until the multipart form upload is replaced
    # with separate json + file upload apis so that the response
    # can be in a nested structure
    #if (!params['observations']) {
    #}
    @observations = params['observations']
    @observations.each do |k, v|
      @observation = v
    end
    #@observations = @observations.is_a? String ? JSON.parse(@observations) : @observations
    
    
    logger.debug "=== New observation ==="
    logger.debug "Params: #{params}"

    tag = @observation['tag'].to_i
    animal_cursor = NoBrainer.run{ |r| r.table('Wildlife').filter({:Tag => tag}) }
    @animal = animal_cursor.first

    logger.debug "Animal with tag #{tag}: #{@animal.to_s}"

    image = @observation['image']
    file_name = image ? SecureRandom.uuid + File.extname(image.original_filename) : ""
    file_name = 'image/' + file_name

    logger.debug "File name: #{file_name}"
    #s3 = Aws::S3.new
    #resp = s3.put_object(
    #{
    #    bucket: 'wingtags-syd',
    #    body: image,
    #    key: file_name
    #})
    

    out = NoBrainer.run{ |r| r.table('Sighting').insert(
      {
        'Location' => @observation['address'],
        'Latitude' => @observation['latitude'].to_f,
        'Longitude' => @observation['longitude'].to_f,
        'WildlifeID' => @animal['WildlifeID'].to_s,
        'SightingDate' => @observation['timestamp'].to_i,
        'SpotterID' => "1422868a-9676-4bb9-ac7c-2d51d0981b51",
        'ImageURL' => ""
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
