require_relative '../spec_helper_lite'
require_relative '../../app/exhibits/animal_profile_exhibit'

describe AnimalProfileExhibit do
  
  subject { AnimalProfileExhibit.new(->{data}) }
  let(:data) { 
    {"Colour"=>"Yellow",
    "CreatedDate"=>1333112400000,
    "Gender"=>"",
    "ImageUrl"=>"",
    "LastSighting"=>1334277559280,
    "Name"=>"CockaStu",
    "Tag"=>23,
    "id"=>"16"}
  }

  it 'initializes from a hash' do
    puts data
    subject.Colour.must_equal "Yellow"
      	#@new_exhibit = AnimalProfileExhibit.new(@data)

  	#@new_exhibit.Colour.must_equal "Yellow"
  end
end


