# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env == 'production' 
  throw "You attempted to seed the production database. That's a big no-no. Aborting."
end


db_name = 'Wingtags_' + Rails.env

NoBrainer.run { |r| r.db_drop("#{db_name}")}

system 'rethinkdb', 'import', '--table', "#{db_name}.Wildlife", '--pkey', 'WildlifeID', '-f', '/Users/Nick/Dev/wingtags/wingtags/data/test/wildlife.json', '--format', 'json';
system 'rethinkdb', 'import', '--table', "#{db_name}.Spotters", '--pkey', 'SpotterID', '-f', '/Users/Nick/Dev/wingtags/wingtags/data/test/spotters.json', '--format', 'json';
system 'rethinkdb', 'import', '--table', "#{db_name}.Sightings", '--pkey', 'SightingID', '-f', '/Users/Nick/Dev/wingtags/wingtags/data/test/sightings.json', '--format', 'json';
