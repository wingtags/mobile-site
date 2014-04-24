class Observation
  include NoBrainer::Document

  store_in :database => 'wingtags_development', :table => 'Sighting'

  belongs_to :animal
  belongs_to :user

  field :ImageURL
  field :Latitude
  field :Longitude
  field :Location
  field :Notes
  field :SightingDate
end
