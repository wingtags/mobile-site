class User
  include NoBrainer::Document

  store_in :database => 'wingtags_development', :table => 'Spotter'

  has_many :observations

  field :DeviceUID,	:type => String
  field :Email, 	:type => String
  field :FirstName, :type => String
  field :LastName, 	:type => String
  field :SpotterID
end
