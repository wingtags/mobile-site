class Animal
  include NoBrainer::Document
  store_in :database => 'wingtags_development', :table => 'Wildlife'

  has_many :observations

  field :Colour, :type => String
  field :Gender, :type => String
  field :Name,   :type => String
  field :Notes,  :type => String
  field :Tag,    :type => Integer
end
