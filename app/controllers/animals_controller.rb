class AnimalsController < ApplicationController
  def show
    @animal = NoBrainer.run{ |r| r.table('Wildlife').get(params[:id]) }
    puts 'animal:'
    puts @animal


    @result = Jbuilder.encode do |json|
      json.animals [@animal] do |a|
        json.id a['WildlifeID']
        json.colour a['Colour']
        json.capture_date a['CreatedDate']
        json.gender a['Gender']
        json.name a['Name']
        json.notes a['Notes']
        json.tag a['Tag']
      end
    end

    respond_to do |format|
      format.json { render :json => @result }
      format.html { render :json => @result }
    end
  end
end
