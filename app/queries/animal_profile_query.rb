require 'rethinkdb'
include RethinkDB::Shortcuts

class AnimalProfileQuery

  @conn = r.connect(
      host: 'localhost',
      port: 28015,
      db: 'wingtags_development')

  def self.all
    r.table('Wildlife')
      .inner_join(
        r.table('Sighting')
        .group('WildlifeID')
        .max('SightingDate')
        .ungroup()
      ) { |wildlife, sighting| wildlife[:WildlifeID].eq(sighting[:reduction][:WildlifeID]) }
      .map { |row|
        {
          Colour: row[:left][:Colour],  
          CreatedDate: row[:left][:CreatedDate],
          Gender: row[:left][:Gender],
          Name: row[:left][:Name],
          Tag: row[:left][:Tag],
          id: row[:left][:id],
          LastSighting: row[:right][:reduction][:SightingDate],
          ImageUrl: ''
        }
      }.run(@conn)
  end
end