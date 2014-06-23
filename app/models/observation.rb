class Observation
  include ActiveModel::Model
  include ActiveModel::Serializers
  include NoBrainer::Document

  attr_accessor :id, :animal_id, :observer_id, :images,  :latitude,  :longitude,  :address,  :notes,  :timestamp

  validates_presence_of :id, :animal_id, :observer_id, :timestamp

  validate :location_information


  private

  def location_information
  end

end
