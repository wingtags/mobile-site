class Observation
  #include ActiveModel::Model
  #include ActiveModel::Serializers
  include NoBrainer::Document
  include NoBrainer::Document::Timestamps
  
  store_in :database => ENV['RETHINKDB_DB'], :table => 'Sighting'

  belongs_to :animal

  field :id,          :as => 'SightingID',    :primary_key => true
  field :latitude,    :as => 'Latitude',      :type => Float
  field :longitude,   :as => 'Longitude',     :type => Float
  field :address,     :as => 'Location',      :type => String
  field :observed_at, :as => 'SightingDate',  :type => Time
  field :animal_id,   :as => 'WildlifeID'


  #attr_accessor :id, :animal_id, :observer_id, :images,  :latitude,  :longitude,  :address,  :notes,  :timestamp
#
  #validates_presence_of :id, :animal_id, :observer_id, :timestamp
#
  #validate :location_information


  private

  def location_information
  end

end
