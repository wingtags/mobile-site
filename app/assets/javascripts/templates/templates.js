JST = {};

JST['animal-identifier'] = _.template("<div class='row'><div class='large-6 columns'><label for='animal-identifier'>Tag number</label><input type='number' id='animal-identifier' name='animal-identifier' min='0' max='999' placeholder='Tag number' autofocus></div></div>");
JST['location/address'] = _.template("<div id='address-template'><div class='row'><div class='large-6 columns'><div class='row'><div class='large-12 columns'><label for='suburb'>Suburb</label><input id='suburb' name='suburb' type='text' /></div></div><div class='row'><div class='large-12 columns'><label for='street'>Street</label><input id='street' name='street' type='text' /></div></div></div></div>");
JST['location/gps'] = _.template("<div id='coordinate-template'><div class='row'><div class='large-6 columns'><div class='panel'><p><span id='gps-status'>Latitude: <%= latitude %>, Longitude: <%= longitude %></span></p></div></div></div>");
JST['location/geocoded-address'] = _.template("<div class='row'><div class='large-6 columns'><div class='panel'><p><span id='geocoded-address'><%= addressString %></span></p></div></div></div>");
JST['location/pending'] = _.template("<div id='coordinate-template'><div class='row'><div class='large-6 columns'><div class='panel'><p><span id='gps-status'>Getting Location...</span></p></div></div></div>");
JST['submit'] = _.template("<div class='row'><div class='large-6 columns' id='submit'><input type=submit class='success button expand' value='Submit'></div></div>");
JST['image'] = _.template("\
  <div class='row'> \
    <div class='large-6 columns' id='image-container'> \
      <input type='file' capture='camera' accept='image/*' id='camera-input' name='camera-input' style='display:none'> \
      <a href='#' id='camera-select' class='button expand'>Add Photo</a> \
    </div> \
  </div>");
JST['thanks'] = _.template("<div class='row'> <div class='large-12 columns text-center'> <h2>Thanks!</h2> <p>You've just found <strong><%= name %></strong>.</p> <p> <a href='http://localhost:3000'>Report another cockatoo</a><br /> <a href='https://www.facebook.com/CockatooWingtags'>Visit us on Facebook</a> </p> </div> </div>");

window.JST = JST;