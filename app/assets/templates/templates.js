JST = {};

JST['animal-identifier'] = _.template("<div class='row'><div class='large-6 columns'><input type='number' min='0' max='999' id='animal-identifier' placeholder='Tag number' autofocus></div></div>");
JST['location/address'] = _.template("<div id='address-template'><div class='row'><div class='large-6 columns'><div class='row'><div class='large-12 columns'><label for='suburb'>Suburb</label><input id='suburb' name='Suburb' type='text' /></div></div><div class='row'><div class='large-12 columns'><label for='street'>Street</label><input id='street' name='Street' type='text' /></div></div></div></div>");
JST['location/gps'] = _.template("<div id='coordinate-template'><div class='row'><div class='large-6 columns'><div class='panel'><p><span id='gps-status'>Latitude: <%= latitude %>, Longitude: <%= longitude %></span></p></div></div></div>");
JST['location/geocoded-address'] = _.template("<div class='row'><div class='large-6 columns'><div class='panel'><p><span id='geocoded-address'><%= addressString %></span></p></div></div></div>");
JST['location/pending'] = _.template("<div id='coordinate-template'><div class='row'><div class='large-6 columns'><div class='panel'><p><span id='gps-status'>Getting Location...</span></p></div></div></div>");
JST['submit'] = _.template("<div class='row'><div class='large-6 columns' id='image-container'><input type=submit class='success button expand' value='Submit'></div></div>");
JST['image'] = _.template("\
  <div class='row'> \
    <div class='large-6 columns' id='image-container'> \
      <input type='file' capture='camera' accept='image/*' id='camera-input' name='camera-input' style='display:none'> \
      <a href='#' id='camera-select' class='button expand'>Add Photo</a> \
    </div> \
  </div>");

window.JST = JST;