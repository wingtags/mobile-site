class User
  include NoBrainer::Document

  store_in :database => ENV['RETHINKDB_DB'], :table => 'Spotter'

  has_many :observations

  field :DeviceUID,	:type => String
  field :Email, 	:type => String
  field :FirstName, :type => String
  field :LastName, 	:type => String
end
