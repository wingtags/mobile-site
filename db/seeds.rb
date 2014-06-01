# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

data_dir = File.expand_path('../../data/test', __FILE__)
files = ['wildlife.json', 'sightings.json', 'observations.json']
system 'rethinkdb', 'import', '--table', 'Wildlife', '--pkey', 'WildlifeID', '-f', 'wildlife.json', '--format', 'json';

NoBrainer.run { |r| r.table()}