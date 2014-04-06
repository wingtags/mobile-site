class Animal
  include NoBrainer::Document

  field :colour, :type => String
  field :gender, :type => String
  field :name,   :type => String
  field :notes,  :type => String
  field :tag,     :type => Integer
end
