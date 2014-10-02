class Animal
  include NoBrainer::Document
  store_in :database => ENV['RETHINKDB_DB'], :table => 'Wildlife'

  has_many :observations

  field :id,      :as => 'WildlifeID',  :primary_key => true
  field :colour,  :as => 'Colour',      :type => String
  field :gender,  :as => 'Gender',      :type => String
  field :name,    :as => 'Name',        :type => String
  field :notes,   :as => 'Notes',       :type => String
  field :tag,     :as => 'Tag',         :type => Integer
end
  