var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var path = require('path');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//test
app.use('/hello', function(req, res, next) {
  res.send('Hello World!');
  next();
});


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://admin:goa@ds039684.mongolab.com:39684/goa');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
   });

  console.log('Listening on port 5000...');
  app.listen(process.env.PORT || 5000);
});