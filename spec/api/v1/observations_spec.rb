require 'spec_helper'

describe "Observations API" do
  it "accepts a new observation" do
    post_data = new_valid_observation

    post 'observations', observation: post_data, format: :json

    expect(response).to be_success
  end  
end


private

def new_valid_observation
  #post_data = Jbuilder.encode do |json|
  #  json.tag = "22"
  #  json.latitude = -33.882973359510984
  #  json.longitude = 151.26951911449567
  #  json.address = "343-345 Old South Head Road, North Bondi NSW 2026, Australia"
  #  json.timestamp = 1388534400000
  #  json.image = Tempfile.new
  #  json.utc_time = 1388534400000
  #end
  img = Tempfile.new('koala')

  {
    tag: "22",
    latitude: -33.882973359510984,
    longitude: 151.26951911449567,
    address: "343-345 Old South Head Road, North Bondi NSW 2026, Australia",
    timestamp: 1388534400000,
    image: fixture_file_upload('files/ryan.png', 'image/png')
  }
end