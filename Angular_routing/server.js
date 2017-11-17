/*var port = process.env.PORT || 8050;
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("Angular-route-index.html")).listen(port, function(){
    console.log('Server running on 8000...');
});*/
var express = require('express');
  var app     = express();
  var path = require('path');
  
  // set the public folder to serve public assets
  app.use(express.static(__dirname + '/'));
  
  // set up our one route to the index.html file
 app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname + '/Angular-route-index.html'));
 });
 app.listen(8050);
 console.log('port is running');