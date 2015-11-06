var restful = require('node-restful');
module.exports = function(app, route) {

  app.get(route, function(req, res, next){

    res.send("HELLO");


  });

  return function(req, res, next) {
    next();
  };
};