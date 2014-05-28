class AnimalProfileExhibit

  attr_accessor :Name, :Gender, :Colour, :Tag, :ImageUrl, :CreatedDate, :LastSighting, :id

	def initialize(*h)
    if h.length == 1 && h.first.kind_of?(Hash)
      h.first.each { |k,v| send("#{k}=",v) }
    end
  end
end