var App = window.App != null ? window.App : {};

App.Sightings = Backbone.Collection.extend({
  //url: "http://api.wingtags.com/sighting/?n=25",
  model: App.Sighting,

  initialize: function() {
    _.bindAll(
      this,
      'toGeoJSON');

    this.reset(this._data, {parse: true});
  },

  toGeoJSON: function() {
    var geoJSON = [];

    _.each(this.models, function(model) { 
      geoJSON.push(model.toGeoJSON()); 
    });

    return geoJSON;
  },

  _data: [
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1340884541000,
        "Gender": "Female",
        "Name": "Lilly",
        "Notes": "",
        "Tag": 57,
        "WildlifeID": "58"
      },
      "ImageURL": "[url]",
      "Latitude": -33.863909603128079,
      "Location": "(null)\nSydney 2000\nNSW",
      "Longitude": 151.2198078354366,
      "Notes": "Cockatoo with tag 057 spotted at:\n(null)\nSydney 2000\nNSW",
      "SightingDate": 1405657517274,
      "SightingID": "d7b43cf9-9c53-4044-8f68-0a14f9038076",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "58"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1338952041557,
        "Gender": "Male",
        "Name": "AJ",
        "Notes": "",
        "Tag": 55,
        "WildlifeID": "56"
      },
      "ImageURL": "[url]",
      "Latitude": -33.860565978358807,
      "Location": "(null)\nSydney 2000\nNSW",
      "Longitude": 151.21882338556881,
      "Notes": "Cockatoo with tag 055 spotted at:\n(null)\nSydney 2000\nNSW",
      "SightingDate": 1405657505072,
      "SightingID": "4c4fb42f-4aef-4422-bd71-d916a889b448",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "56"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1377135213950,
        "Gender": "",
        "Name": "The Wig",
        "Notes": "brown eye",
        "Tag": 88,
        "WildlifeID": "113"
      },
      "ImageURL": "[url]",
      "Latitude": -33.863900802129749,
      "Location": "(null)\nSydney 2000\nNSW",
      "Longitude": 151.21969216517289,
      "Notes": "Cockatoo with tag 088 spotted at:\n(null)\nPort Jackson \n",
      "SightingDate": 1405655186374,
      "SightingID": "5f55537d-0348-490d-acb6-ec5cb3081c39",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "113"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1338176878450,
        "Gender": "Male",
        "Name": "Heidi",
        "Notes": "",
        "Tag": 48,
        "WildlifeID": "52"
      },
      "ImageURL": "[url]",
      "Latitude": -33.865712969595442,
      "Location": "Mrs Macquaries Road\nSydney 2000\nNSW",
      "Longitude": 151.21964447214381,
      "Notes": "Cockatoo with tag 048 spotted at:\nCowper Wharf Roadway\nPort Jackson 2011\n",
      "SightingDate": 1405635645397,
      "SightingID": "d1aef73d-a01d-4e26-9841-0cc6a5b62f73",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "52"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1402829991679,
        "Gender": "Male",
        "Name": "Unicorn",
        "Notes": "brown eye",
        "Tag": 101,
        "WildlifeID": "126"
      },
      "ImageURL": "[url]",
      "Latitude": -33.86652731156456,
      "Location": "Cowper Wharf Roadway\nPort Jackson 2011\n",
      "Longitude": 151.22040746584759,
      "Notes": "Cockatoo with tag 101 spotted at:\nCowper Wharf Roadway\nPort Jackson 2011\n",
      "SightingDate": 1405635568443,
      "SightingID": "4f23e35c-ff60-473d-822f-5b5424295c27",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "126"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1358338029500,
        "Gender": "Male",
        "Name": "Shadow",
        "Notes": "",
        "Tag": 67,
        "WildlifeID": "81"
      },
      "ImageURL": "[url]",
      "Latitude": -33.897511758123329,
      "Location": "Fitzgerald Lane\nQueens Park 2022\nNSW",
      "Longitude": 151.24879174572081,
      "Notes": "Cockatoo with tag 067 spotted at:\nFitzgerald Lane\nQueens Park 2022\nNSW",
      "SightingDate": 1405632584943,
      "SightingID": "4f585fc0-60d4-4b8c-8842-8b9c008a1b15",
      "Spotter": {
        "CreatedDate": 1350590378927,
        "FirstName": "Andrew",
        "LastName": "Taubman",
        "SpotterID": "241"
      },
      "SpotterID": "241",
      "WildlifeID": "81"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1377135244643,
        "Gender": "",
        "Name": "Falstaff",
        "Notes": "brown eye",
        "Tag": 89,
        "WildlifeID": "114"
      },
      "ImageURL": "[url]",
      "Latitude": -33.89753176427476,
      "Location": "Birrell Street\nBondi Junction 2022\nNSW",
      "Longitude": 151.24878884615239,
      "Notes": "Cockatoo with tag 089 spotted at GPS location: -33.897532, 151.248789",
      "SightingDate": 1405632575752,
      "SightingID": "8f937f5d-af9c-433a-a1ef-ffe5f9c9527d",
      "Spotter": {
        "CreatedDate": 1350590378927,
        "FirstName": "Andrew",
        "LastName": "Taubman",
        "SpotterID": "241"
      },
      "SpotterID": "241",
      "WildlifeID": "114"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1366612870560,
        "Gender": "Male",
        "Name": "Foxy",
        "Notes": "",
        "Tag": 74,
        "WildlifeID": "94"
      },
      "ImageURL": "fe1bf838-3419-f7db-bffa-148b43d04b3d.jpeg",
      "Latitude": -33.904654202083037,
      "Location": "ANZAC Parade\nKensington 2033\nNew South Wales",
      "Longitude": 151.22353937490959,
      "Notes": "Cockatoo with tag 074 spotted at:\n3-5 ANZAC Parade\nKensington 2033\nNew South Wales",
      "SightingDate": 1405605208013,
      "SightingID": "bc8536f1-a7e2-4651-a36f-14d7f5dc9d97",
      "Spotter": {
        "CreatedDate": 1405605198811,
        "DeviceUID": "Unknown",
        "FirstName": "Alicia",
        "LastName": "Cheng",
        "SpotterID": "ef9f597e-4e2f-4436-8016-23fa0964a32d"
      },
      "SpotterID": "ef9f597e-4e2f-4436-8016-23fa0964a32d",
      "WildlifeID": "94"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1358338036877,
        "Gender": "Male",
        "Name": "Dione",
        "Notes": "",
        "Tag": 68,
        "WildlifeID": "82"
      },
      "Latitude": 52.09517834058996,
      "Location": "H.J. Schimmelplein 18-19, 3532 TE Utrecht, Nederland",
      "Longitude": 5.0999157232345853,
      "SightingDate": 1405589703085,
      "SightingID": "b1e47060-6b17-47e9-95c4-1978186caf92",
      "Spotter": {
        "CreatedDate": 1397874920608,
        "DeviceUID": "Unknown",
        "FirstName": "Unknown",
        "LastName": "Unknown",
        "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51"
      },
      "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51",
      "WildlifeID": "82"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1379041101693,
        "Gender": "Male",
        "Name": "Albie",
        "Notes": "blk-brown eye",
        "Tag": 93,
        "WildlifeID": "119"
      },
      "ImageURL": "27f5ab77-0750-36f7-44ca-8ca6477d8b10.jpeg",
      "Latitude": -33.871970647046219,
      "Location": "Greenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22715767487071,
      "Notes": "Cockatoo with tag 093 spotted at:\nElizabeth Bay Road\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405577297727,
      "SightingID": "ab2142cf-c4f3-42f4-8f2b-1bfe4a75a4d5",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "119"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1377135213950,
        "Gender": "",
        "Name": "The Wig",
        "Notes": "brown eye",
        "Tag": 88,
        "WildlifeID": "113"
      },
      "ImageURL": "67fa536f-0d84-ae97-7a24-db181ffeaaa7.jpeg",
      "Latitude": -33.871722554585887,
      "Location": "Waratah Street\nRushcutters Bay 2011\nNSW",
      "Longitude": 151.2274307355793,
      "Notes": "Cockatoo with tag 088 spotted at:\nWaratah Street\nRushcutters Bay 2011\nNSW",
      "SightingDate": 1405576994748,
      "SightingID": "c4db380c-f3c1-47ff-a759-2743227736d0",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "113"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1375773789143,
        "Gender": "",
        "Name": "Speck",
        "Notes": "brown eye",
        "Tag": 86,
        "WildlifeID": "111"
      },
      "ImageURL": "eeca3ac4-0cb5-0222-5875-cff1e823957c.jpeg",
      "Latitude": -33.903536307657049,
      "Location": "Parkes Drive\nCentennial Park 2021\nNSW",
      "Longitude": 151.2350716163881,
      "Notes": "Cockatoo with tag 086 spotted at:\nParkes Drive\nCentennial Park 2021\nNSW",
      "SightingDate": 1405552408863,
      "SightingID": "56aaacca-54ea-4e88-93cb-6cc3ec407dd2",
      "Spotter": {
        "CreatedDate": 1367275643687,
        "FirstName": "Anne",
        "LastName": "Brophy",
        "SpotterID": "447"
      },
      "SpotterID": "447",
      "WildlifeID": "111"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1402829991679,
        "Gender": "Male",
        "Name": "Unicorn",
        "Notes": "brown eye",
        "Tag": 101,
        "WildlifeID": "126"
      },
      "Latitude": -33.869500877367209,
      "Location": "73 Castlereagh Street, Sydney NSW 2000, Australia",
      "Longitude": 151.20962600237803,
      "SightingDate": 1405501876742,
      "SightingID": "472e45d2-dfd4-4d8e-90ce-0be50360e6ac",
      "Spotter": {
        "CreatedDate": 1397874920608,
        "DeviceUID": "Unknown",
        "FirstName": "Unknown",
        "LastName": "Unknown",
        "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51"
      },
      "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51",
      "WildlifeID": "126"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Columbus",
        "Notes": "",
        "Tag": 1,
        "WildlifeID": "1"
      },
      "Latitude": -33.897308553636371,
      "Location": "318 King Street, Newtown NSW 2042, Australia",
      "Longitude": 151.17940023545455,
      "SightingDate": 1405493184223,
      "SightingID": "2f4fad81-09dd-43d8-a433-2429668c4a00",
      "Spotter": {
        "CreatedDate": 1397874920608,
        "DeviceUID": "Unknown",
        "FirstName": "Unknown",
        "LastName": "Unknown",
        "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51"
      },
      "SpotterID": "1422868a-9676-4bb9-ac7c-2d51d0981b51",
      "WildlifeID": "1"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1358338036877,
        "Gender": "Male",
        "Name": "Dione",
        "Notes": "",
        "Tag": 68,
        "WildlifeID": "82"
      },
      "ImageURL": "161e3f53-1b75-fdd5-9a38-b254fa13c57a.jpeg",
      "Latitude": -33.871780111556554,
      "Location": "Greenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22736179201681,
      "Notes": "Cockatoo with tag 068 spotted at:\nGreenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405492002484,
      "SightingID": "eaa42572-80cb-4199-b1ab-d211f4cf23cf",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "82"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1345628871180,
        "Gender": "Male",
        "Name": "Hazel",
        "Notes": "",
        "Tag": 15,
        "WildlifeID": "71"
      },
      "ImageURL": "3fc9f117-c51f-859a-dcf5-a604325dfcae.jpeg",
      "Latitude": -33.818656755642792,
      "Location": "Wyong Road\nMosman 2088\nNSW",
      "Longitude": 151.23359388685901,
      "Notes": "Cockatoo with tag 015 spotted at:\nWyong Road\nMosman 2088\nNSW",
      "SightingDate": 1405491875258,
      "SightingID": "c34da2da-6dfa-475a-a785-7825b7633f50",
      "Spotter": {
        "CreatedDate": 1379058484390,
        "FirstName": "Tim",
        "LastName": "Crossman",
        "SpotterID": "587"
      },
      "SpotterID": "587",
      "WildlifeID": "71"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Mr Squiggle",
        "Notes": "",
        "Tag": 16,
        "WildlifeID": "13"
      },
      "ImageURL": "525a9140-783e-8c7a-46b1-df44bcceff3c.jpeg",
      "Latitude": -33.818663419255813,
      "Location": "Wyong Road\nMosman 2088\nNSW",
      "Longitude": 151.2335687411495,
      "Notes": "Cockatoo with tag 016 spotted at:\nWyong Road\nMosman 2088\nNSW",
      "SightingDate": 1405491739153,
      "SightingID": "7a9bd77a-90c1-40fc-a360-724afaae164b",
      "Spotter": {
        "CreatedDate": 1379058484390,
        "FirstName": "Tim",
        "LastName": "Crossman",
        "SpotterID": "587"
      },
      "SpotterID": "587",
      "WildlifeID": "13"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1336106374267,
        "Gender": "Male",
        "Name": "Charles",
        "Notes": "",
        "Tag": 49,
        "WildlifeID": "49"
      },
      "ImageURL": "f056cad9-6a8e-aeb1-e5c6-3535342a9c71.jpeg",
      "Latitude": -33.818658222475847,
      "Location": "Wyong Road\nMosman 2088\nNSW",
      "Longitude": 151.23357024989201,
      "Notes": "Cockatoo with tag 049 spotted at:\nWyong Road\nMosman 2088\nNSW",
      "SightingDate": 1405491668097,
      "SightingID": "619f531a-f598-488f-a79d-23d0dd7d1e15",
      "Spotter": {
        "CreatedDate": 1379058484390,
        "FirstName": "Tim",
        "LastName": "Crossman",
        "SpotterID": "587"
      },
      "SpotterID": "587",
      "WildlifeID": "49"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Jimmy",
        "Notes": "",
        "Tag": 22,
        "WildlifeID": "15"
      },
      "ImageURL": "606add01-8922-15d5-3791-dff74203b2e5.jpeg",
      "Latitude": -33.818658222475847,
      "Location": "Wyong Road\nMosman 2088\nNSW",
      "Longitude": 151.23357024989201,
      "Notes": "Cockatoo with tag 022 spotted at:\nWyong Road\nMosman 2088\nNSW",
      "SightingDate": 1405491632618,
      "SightingID": "6db479f2-9bd3-45f3-8605-6ebc0cfefd7c",
      "Spotter": {
        "CreatedDate": 1379058484390,
        "FirstName": "Tim",
        "LastName": "Crossman",
        "SpotterID": "587"
      },
      "SpotterID": "587",
      "WildlifeID": "15"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1338417915103,
        "Gender": "Male",
        "Name": "Spoc",
        "Notes": "",
        "Tag": 54,
        "WildlifeID": "55"
      },
      "ImageURL": "56ee8260-21b6-6a7d-8663-6f72882248be.jpeg",
      "Latitude": -33.818652774238792,
      "Location": "Wyong Road\nMosman 2088\nNSW",
      "Longitude": 151.23361291377921,
      "Notes": "Cockatoo with tag 054 spotted at:\nWyong Road\nMosman 2088\nNSW",
      "SightingDate": 1405491557568,
      "SightingID": "44c7a923-e57f-465c-aa8a-dec19839fc95",
      "Spotter": {
        "CreatedDate": 1379058484390,
        "FirstName": "Tim",
        "LastName": "Crossman",
        "SpotterID": "587"
      },
      "SpotterID": "587",
      "WildlifeID": "55"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Venus",
        "Notes": "",
        "Tag": 26,
        "WildlifeID": "19"
      },
      "ImageURL": "0c805929-6e1b-1ff2-5d95-a9629d03e4d9.jpeg",
      "Latitude": -33.871737178216947,
      "Location": "Palmer Street\nWoolloomooloo 2011\nNSW",
      "Longitude": 151.2176898044344,
      "Notes": "Cockatoo with tag 026 spotted at:\nPalmer Street\nWoolloomooloo\nNSW",
      "SightingDate": 1405485924346,
      "SightingID": "f771ed77-5e03-4930-a699-5d00306b4768",
      "Spotter": {
        "CreatedDate": 1398806567523,
        "DeviceUID": "Unknown",
        "FirstName": "Virna",
        "LastName": "Unknown",
        "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb"
      },
      "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb",
      "WildlifeID": "19"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1378346516227,
        "Gender": "",
        "Name": "Booker",
        "Notes": "brown eye",
        "Tag": 92,
        "WildlifeID": "118"
      },
      "ImageURL": "[url]",
      "Latitude": -33.898991133333332,
      "Location": "",
      "Longitude": 151.22899916666671,
      "Notes": "Cockatoo with tag 092 spotted at GPS location: -33.898463, 151.227924",
      "SightingDate": 1405477265195,
      "SightingID": "798b3ca9-3600-484e-989c-34490028c795",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "118"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1344551256963,
        "Gender": "Male",
        "Name": "Juggler",
        "Notes": "",
        "Tag": 10,
        "WildlifeID": "68"
      },
      "ImageURL": "[url]",
      "Latitude": -33.90256346666667,
      "Location": "Parkes Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.2346684,
      "Notes": "Cockatoo with tag 010 spotted at:\nParkes Drive\nCentennial Park 2021\nNew South Wales",
      "SightingDate": 1405474212945,
      "SightingID": "ae8d30db-ad42-4eee-a7e9-be4d68f51c72",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "68"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1379653660003,
        "Gender": "",
        "Name": "John-Jones",
        "Notes": "brown-eye",
        "Tag": 95,
        "WildlifeID": "121"
      },
      "ImageURL": "[url]",
      "Latitude": -33.904447478913568,
      "Location": "Parkes Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.234800046792,
      "Notes": "Cockatoo with tag 095 spotted at GPS location: -33.904447, 151.234800",
      "SightingDate": 1405405229695,
      "SightingID": "d0b7a108-ab04-4136-96be-0f4e070aa7db",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "121"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1396584131987,
        "Gender": "Male",
        "Name": "Phantom",
        "Notes": "brown eye",
        "Tag": 98,
        "WildlifeID": "124"
      },
      "ImageURL": "[url]",
      "Latitude": -33.903371666666658,
      "Location": "Parkes Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.2348581,
      "Notes": "Cockatoo with tag 098 spotted at GPS location: -33.903372, 151.234858",
      "SightingDate": 1405405109042,
      "SightingID": "8b67fec2-1253-41f0-812f-588614d3676b",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "124"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1394172497583,
        "Gender": "",
        "Name": "RatherBFishin",
        "Notes": "Brown eye",
        "Tag": 97,
        "WildlifeID": "123"
      },
      "ImageURL": "[url]",
      "Latitude": -33.903371666666658,
      "Location": "Parkes Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.2348581,
      "Notes": "Cockatoo with tag 097 spotted at GPS location: -33.903372, 151.234858",
      "SightingDate": 1405405093791,
      "SightingID": "5b500f1d-dd20-40c4-8cbd-aa1c634ea229",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "123"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1377135244643,
        "Gender": "",
        "Name": "Falstaff",
        "Notes": "brown eye",
        "Tag": 89,
        "WildlifeID": "114"
      },
      "ImageURL": "[url]",
      "Latitude": -33.903371666666658,
      "Location": "",
      "Longitude": 151.2348581,
      "Notes": "Cockatoo with tag 089 spotted at GPS location: -33.903372, 151.234858",
      "SightingDate": 1405405079322,
      "SightingID": "7204f8d8-714e-4897-9a68-ddf9c50b7b24",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "114"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1358338029500,
        "Gender": "Male",
        "Name": "Shadow",
        "Notes": "",
        "Tag": 67,
        "WildlifeID": "81"
      },
      "ImageURL": "[url]",
      "Latitude": -33.90371256666667,
      "Location": "Grand Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.23450203333331,
      "Notes": "Cockatoo with tag 067 spotted at GPS location: -33.903713, 151.234502",
      "SightingDate": 1405405060706,
      "SightingID": "1e9fedea-cc4c-478d-b873-e58c8f8b0736",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "81"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1344551256963,
        "Gender": "Male",
        "Name": "Juggler",
        "Notes": "",
        "Tag": 10,
        "WildlifeID": "68"
      },
      "ImageURL": "[url]",
      "Latitude": -33.899914996729052,
      "Location": "Parkes Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.23258071495169,
      "Notes": "Cockatoo with tag 010 spotted at GPS location: -33.899915, 151.232581",
      "SightingDate": 1405405046342,
      "SightingID": "ce1520af-5d22-4867-b867-4b7408ce0580",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "68"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "CockaStu",
        "Notes": "",
        "Tag": 23,
        "WildlifeID": "16"
      },
      "ImageURL": "812602fe-e220-1c84-f69f-564b78848f53.jpeg",
      "Latitude": -33.833971750022691,
      "Location": "Bradleys Head Road\nMosman 2088\nNSW",
      "Longitude": 151.24551471336861,
      "Notes": "Cockatoo with tag 023 spotted at:\nBradleys Head Road\nMosman 2088\nNSW",
      "SightingDate": 1405402890832,
      "SightingID": "48c5ab12-da28-45d8-93bb-a8fc609abda2",
      "Spotter": {
        "CreatedDate": 1367120912527,
        "FirstName": "David",
        "LastName": "Unknown",
        "SpotterID": "438"
      },
      "SpotterID": "438",
      "WildlifeID": "16"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1347490031800,
        "Gender": "Male",
        "Name": "Snow White",
        "Notes": "",
        "Tag": 18,
        "WildlifeID": "73"
      },
      "ImageURL": "[url]",
      "Latitude": 0,
      "Location": "",
      "Longitude": 0,
      "Notes": "Cockatoo with tag 018 spotted.\nLocation: ",
      "SightingDate": 1405391805294,
      "SightingID": "9dd25f3c-86cb-49ac-a502-b8f1115e0538",
      "Spotter": {
        "CreatedDate": 1396946472188,
        "DeviceUID": "Unknown",
        "FirstName": "Unknown",
        "LastName": "Unknown",
        "SpotterID": "a40b6735-553b-490d-99d3-491cac22ea0d"
      },
      "SpotterID": "a40b6735-553b-490d-99d3-491cac22ea0d",
      "WildlifeID": "73"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Winnie",
        "Notes": "",
        "Tag": 21,
        "WildlifeID": "14"
      },
      "ImageURL": "80472fe9-90d4-0427-56a1-e1f272407a7d.jpeg",
      "Latitude": -33.871835530767093,
      "Location": "Greenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22669667019619,
      "Notes": "Cockatoo with tag 021 spotted at:\nGreenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405382310586,
      "SightingID": "0861caa0-d43c-4dc0-a635-3bf23f7863b9",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "14"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Columbus",
        "Notes": "",
        "Tag": 1,
        "WildlifeID": "1"
      },
      "ImageURL": "57fd6b6e-5cc6-4e5f-e4de-2311466fc5ee.jpeg",
      "Latitude": -33.871556364803553,
      "Location": "Greenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22702708838861,
      "Notes": "Cockatoo with tag 001 spotted at:\nGreenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405382280655,
      "SightingID": "533a18bb-4f60-41ff-a3c2-3465f31685bd",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "1"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1358338029500,
        "Gender": "Male",
        "Name": "Shadow",
        "Notes": "",
        "Tag": 67,
        "WildlifeID": "81"
      },
      "ImageURL": "c77e4fc0-ab16-f4d3-acfd-9326492f6578.jpeg",
      "Latitude": -33.897497188331457,
      "Location": "Fitzgerald Lane\nQueens Park 2022\nNSW",
      "Longitude": 151.2487009262212,
      "Notes": "Cockatoo with tag 067 spotted at:\nFitzgerald Lane\nQueens Park 2022\nNSW",
      "SightingDate": 1405372826888,
      "SightingID": "0436b727-4ff1-431f-8b4a-607b77ec743a",
      "Spotter": {
        "CreatedDate": 1350590378927,
        "FirstName": "Andrew",
        "LastName": "Taubman",
        "SpotterID": "241"
      },
      "SpotterID": "241",
      "WildlifeID": "81"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1366612659217,
        "Gender": "Male",
        "Name": "Humphrey",
        "Notes": "",
        "Tag": 76,
        "WildlifeID": "90"
      },
      "ImageURL": "[url]",
      "Latitude": -33.897712100328782,
      "Location": "Fitzgerald Lane\nQueens Park 2022\nNSW",
      "Longitude": 151.24894090010901,
      "Notes": "Cockatoo with tag 076 spotted at:\nFitzgerald Lane\nQueens Park 2022\nNSW",
      "SightingDate": 1405372716576,
      "SightingID": "9b80682a-e183-4b05-8a18-22e99fb094bf",
      "Spotter": {
        "CreatedDate": 1350590378927,
        "FirstName": "Andrew",
        "LastName": "Taubman",
        "SpotterID": "241"
      },
      "SpotterID": "241",
      "WildlifeID": "90"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1375773768180,
        "Gender": "",
        "Name": "Tristan",
        "Notes": "brown eye",
        "Tag": 85,
        "WildlifeID": "110"
      },
      "ImageURL": "[url]",
      "Latitude": -33.897614902678797,
      "Location": "Donald Place\nBondi Junction 2022\nNSW",
      "Longitude": 151.2487984364613,
      "Notes": "Cockatoo with tag 085 spotted at:\nDonald Place\nBondi Junction 2022\nNSW",
      "SightingDate": 1405372708076,
      "SightingID": "7ee44d2f-661b-4820-96e0-cad903718ee1",
      "Spotter": {
        "CreatedDate": 1350590378927,
        "FirstName": "Andrew",
        "LastName": "Taubman",
        "SpotterID": "241"
      },
      "SpotterID": "241",
      "WildlifeID": "110"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Peaches",
        "Notes": "",
        "Tag": 39,
        "WildlifeID": "34"
      },
      "ImageURL": "f208a403-2edc-e140-e969-4a4df47f1ffe.jpeg",
      "Latitude": -33.872016537966083,
      "Location": "Elizabeth Bay Road\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22749471119721,
      "Notes": "Cockatoo with tag 039 spotted at:\nElizabeth Bay Road\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405372395099,
      "SightingID": "62118fee-0241-4caf-9df0-7628c4d9058c",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "34"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1375773789143,
        "Gender": "",
        "Name": "Speck",
        "Notes": "brown eye",
        "Tag": 86,
        "WildlifeID": "111"
      },
      "ImageURL": "071cf2d9-7536-910a-0240-33f0d37e86ed.jpeg",
      "Latitude": -33.871689057009171,
      "Location": "Eastern Distributor Motorway\nWoolloomooloo 2011\nNSW",
      "Longitude": 151.21780305183611,
      "Notes": "Cockatoo with tag 086 spotted at:\nEastern Distributor Motorway\nWoolloomooloo 2011\nNSW",
      "SightingDate": 1405316986524,
      "SightingID": "21ac7273-72ce-4177-b5f7-d58d1446920a",
      "Spotter": {
        "CreatedDate": 1398806567523,
        "DeviceUID": "Unknown",
        "FirstName": "Virna",
        "LastName": "Unknown",
        "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb"
      },
      "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb",
      "WildlifeID": "111"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Venus",
        "Notes": "",
        "Tag": 26,
        "WildlifeID": "19"
      },
      "ImageURL": "29feb8ac-866e-017d-8ab7-65b2d34e38c7.jpeg",
      "Latitude": -33.871786287085961,
      "Location": "Eastern Distributor Motorway\nWoolloomooloo 2011\nNSW",
      "Longitude": 151.2177855336584,
      "Notes": "Cockatoo with tag 026 spotted at:\nEastern Distributor Motorway\nWoolloomooloo 2011\nNSW",
      "SightingDate": 1405316952808,
      "SightingID": "91075d3b-fce2-4070-9f63-2203927b6ca6",
      "Spotter": {
        "CreatedDate": 1398806567523,
        "DeviceUID": "Unknown",
        "FirstName": "Virna",
        "LastName": "Unknown",
        "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb"
      },
      "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb",
      "WildlifeID": "19"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1338417897307,
        "Gender": "Male",
        "Name": "Xavier",
        "Notes": "",
        "Tag": 52,
        "WildlifeID": "53"
      },
      "ImageURL": "1f3d1b4c-9831-ecde-98e0-b16b61cfecfd.jpeg",
      "Latitude": -33.871713322618852,
      "Location": "Palmer Street\nWoolloomooloo 2011\nNSW",
      "Longitude": 151.2177504973032,
      "Notes": "Cockatoo with tag 052 spotted at:\nPalmer Street\nWoolloomooloo 2011\nNSW",
      "SightingDate": 1405316844191,
      "SightingID": "75ebd165-9d4f-4049-982a-8b6672cb61d4",
      "Spotter": {
        "CreatedDate": 1398806567523,
        "DeviceUID": "Unknown",
        "FirstName": "Virna",
        "LastName": "Unknown",
        "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb"
      },
      "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb",
      "WildlifeID": "53"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1351825344620,
        "Gender": "Male",
        "Name": "Houdini",
        "Notes": "",
        "Tag": 66,
        "WildlifeID": "80"
      },
      "ImageURL": "784083a8-8d6d-407a-d273-e8e4fb406884.jpeg",
      "Latitude": -33.871703953868931,
      "Location": "Palmer Street\nWoolloomooloo 2011\nNSW",
      "Longitude": 151.2176856875316,
      "Notes": "Cockatoo with tag 066 spotted at:\nPalmer Street\nWoolloomooloo 2011\nNSW",
      "SightingDate": 1405316816947,
      "SightingID": "299ea821-a5dd-4f4b-92b6-5bb0b2ed0bc2",
      "Spotter": {
        "CreatedDate": 1398806567523,
        "DeviceUID": "Unknown",
        "FirstName": "Virna",
        "LastName": "Unknown",
        "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb"
      },
      "SpotterID": "df1f13a9-76ba-4616-b1cb-d2171df99feb",
      "WildlifeID": "80"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1396584131987,
        "Gender": "Male",
        "Name": "Phantom",
        "Notes": "brown eye",
        "Tag": 98,
        "WildlifeID": "124"
      },
      "ImageURL": "[url]",
      "Latitude": -33.897234599999997,
      "Location": "Grand Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.22980195,
      "Notes": "Cockatoo with tag 098 spotted at:\nDickens Drive\nCentennial Park 2021\nNew South Wales",
      "SightingDate": 1405303868790,
      "SightingID": "ce92d992-4f0e-4690-8538-6e875b48fd17",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "124"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1377135244643,
        "Gender": "",
        "Name": "Falstaff",
        "Notes": "brown eye",
        "Tag": 89,
        "WildlifeID": "114"
      },
      "ImageURL": "[url]",
      "Latitude": -33.898464572393259,
      "Location": "Dickens Drive\nCentennial Park 2021\nNew South Wales",
      "Longitude": 151.2337508284881,
      "Notes": "Cockatoo with tag 089 spotted at:\nParkes Drive\nCentennial Park 2021\nNew South Wales",
      "SightingDate": 1405303010412,
      "SightingID": "3e766117-f51f-4731-aa1d-75677ae6c283",
      "Spotter": {
        "CreatedDate": 1370404335760,
        "FirstName": "Marylon",
        "LastName": "Coates",
        "SpotterID": "513"
      },
      "SpotterID": "513",
      "WildlifeID": "114"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1350293825107,
        "Gender": "Male",
        "Name": "Clive",
        "Notes": "",
        "Tag": 63,
        "WildlifeID": "74"
      },
      "ImageURL": "dd129399-5554-b3da-80f4-52a0ce4baddb.jpeg",
      "Latitude": -33.871906782099408,
      "Location": "Elizabeth Bay Road\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22797069250129,
      "Notes": "Cockatoo with tag 063 spotted at:\nElizabeth Bay Road\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405296057165,
      "SightingID": "a8bd0240-78a8-48be-8eb9-e23c611aa359",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "74"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Columbus",
        "Notes": "",
        "Tag": 1,
        "WildlifeID": "1"
      },
      "ImageURL": "7eea933e-b1b9-2b78-6344-213569ef23f9.jpeg",
      "Latitude": -33.871742692060302,
      "Location": "Greenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.2271524435198,
      "Notes": "Cockatoo with tag 001 spotted at:\nGreenknowe Avenue\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405291795146,
      "SightingID": "765c6877-ec13-4c10-b00f-69abd2c6827f",
      "Spotter": {
        "CreatedDate": 1337553343850,
        "FirstName": "Andrew",
        "LastName": "S",
        "SpotterID": "90"
      },
      "SpotterID": "90",
      "WildlifeID": "1"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1379041120530,
        "Gender": "",
        "Name": "Bruce",
        "Notes": "brown eye",
        "Tag": 94,
        "WildlifeID": "120"
      },
      "ImageURL": "[url]",
      "Latitude": -33.869005634486193,
      "Location": "Eastern Distributor Motorway\nSydney 2000\nNSW",
      "Longitude": 151.21862596915929,
      "Notes": "Cockatoo with tag 094 spotted at:\nEastern Distributor Motorway\nWoolloomooloo 2011\nNSW",
      "SightingDate": 1405289935229,
      "SightingID": "c1fb7901-eca3-420a-9714-10b38d6b3b97",
      "Spotter": {
        "CreatedDate": 1345179612617,
        "FirstName": "JM",
        "LastName": "Unknown",
        "SpotterID": "177"
      },
      "SpotterID": "177",
      "WildlifeID": "120"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1338417897307,
        "Gender": "Male",
        "Name": "Xavier",
        "Notes": "",
        "Tag": 52,
        "WildlifeID": "53"
      },
      "ImageURL": "[url]",
      "Latitude": -33.877293155560153,
      "Location": "Thomson Lane\nDarlinghurst 2010\nNew South Wales",
      "Longitude": 151.21827621027009,
      "Notes": "Cockatoo with tag 052 spotted at:\nThomson Lane\nDarlinghurst 2010\nNew South Wales",
      "SightingDate": 1405286266003,
      "SightingID": "3df302fa-4226-43ad-96f3-2883bb5d0ef5",
      "Spotter": {
        "CreatedDate": 1379062211503,
        "FirstName": "Stacey",
        "LastName": "Unknown",
        "SpotterID": "588"
      },
      "SpotterID": "588",
      "WildlifeID": "53"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1378346489570,
        "Gender": "Male",
        "Name": "Murphy",
        "Notes": "Black eye",
        "Tag": 91,
        "WildlifeID": "117"
      },
      "ImageURL": "[url]",
      "Latitude": -33.87727932541992,
      "Location": "Thomson Lane\nDarlinghurst 2010\nNew South Wales",
      "Longitude": 151.21831669486241,
      "Notes": "Cockatoo with tag 091 spotted at:\nThomson Lane\nDarlinghurst 2010\nNew South Wales",
      "SightingDate": 1405286254337,
      "SightingID": "badd5201-a769-46bb-95ce-ad95d279d721",
      "Spotter": {
        "CreatedDate": 1379062211503,
        "FirstName": "Stacey",
        "LastName": "Unknown",
        "SpotterID": "588"
      },
      "SpotterID": "588",
      "WildlifeID": "117"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1379041101693,
        "Gender": "Male",
        "Name": "Albie",
        "Notes": "blk-brown eye",
        "Tag": 93,
        "WildlifeID": "119"
      },
      "ImageURL": "78141cc7-ced0-4301-74b1-6e4dad7dbebf.jpeg",
      "Latitude": -33.873890317694112,
      "Location": "Barncleuth Square\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22615763607701,
      "Notes": "Cockatoo with tag 093 spotted at:\nBarncleuth Square\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405234517913,
      "SightingID": "e65e153d-65f7-41fe-80df-e42f62051bef",
      "Spotter": {
        "CreatedDate": 1404023649909,
        "DeviceUID": "Unknown",
        "FirstName": "Sam & Erryn",
        "LastName": "Unknown",
        "SpotterID": "e6d8a327-e44b-4c6a-9279-e9909bc60f95"
      },
      "SpotterID": "e6d8a327-e44b-4c6a-9279-e9909bc60f95",
      "WildlifeID": "119"
    },
    {
      "Animal": {
        "Colour": "Yellow",
        "CreatedDate": 1333112400000,
        "Gender": "",
        "Name": "Columbus",
        "Notes": "",
        "Tag": 1,
        "WildlifeID": "1"
      },
      "ImageURL": "eff93131-957f-4828-5f03-a9438d97cb56.jpeg",
      "Latitude": -33.873736788899059,
      "Location": "Barncleuth Square\nElizabeth Bay 2011\nNSW",
      "Longitude": 151.22615425474939,
      "Notes": "Cockatoo with tag 001 spotted at:\nBarncleuth Square\nElizabeth Bay 2011\nNSW",
      "SightingDate": 1405234460082,
      "SightingID": "598cbf85-621c-4479-843e-ba86ac9844e5",
      "Spotter": {
        "CreatedDate": 1404023649909,
        "DeviceUID": "Unknown",
        "FirstName": "Sam & Erryn",
        "LastName": "Unknown",
        "SpotterID": "e6d8a327-e44b-4c6a-9279-e9909bc60f95"
      },
      "SpotterID": "e6d8a327-e44b-4c6a-9279-e9909bc60f95",
      "WildlifeID": "1"
    }
  ]
});