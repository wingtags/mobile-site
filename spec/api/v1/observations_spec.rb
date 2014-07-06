require 'spec_helper'
require 'pry-debugger'

describe ObservationsController, :type => :controller do
  it "accepts a new observation" do
    post_data = new_valid_observation

    post :create, :observations => post_data, :format => :json

    expect(response.status).to eq 200
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

  path = "#{::Rails.root}/spec/fixtures/files/ryan.png"

  data = { 0 => {
    tag: "47",
    latitude: -33.882973359510984,
    longitude: 151.26951911449567,
    address: "343-345 Old South Head Road, North Bondi NSW 2026, Australia",
    timestamp: 1388534400000,
    image: "UUID"
  }}

  return data
end