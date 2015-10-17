angular.module('starter.services', [])

.factory('User', function($http, SERVER, $q) {

  var o = {
    username: false,
    session_id: false,
    favorites:[],
    newFavorites: 0,
    gender: false
  }

  o.addtoFavorites = function(article) {

    var brand = article.brand;
    var likes = 0;

    console.log(brand);

    if(o.favorites[brand])
      likes = o.favorites[brand]


    o.favorites[brand] = likes + 1;

    console.log(o.favorites);

  }



  return o;

})

.factory('Recommendations', function($http, SERVER, $q) {

  var o = {
    queue: []
  };

  o.init = function () {
    if(o.queue.length == 0 ) {

      return o.getNextArticles();
    }
    else {
      return o.getNextSongs();
    }
  }

  o.getNextArticles = function(){
    return $http({
      method: 'GET',
      url: SERVER.url + '/article'
    }).success(function(data){
      o.queue = o.queue.concat(data);
    });
  };

  o.nextArticle = function() {
    o.queue.shift();

    if(o.queue.length <= 3) {
      o.getNextSongs();
    }
  };



  return o;

})

.factory('MallMap', function($http, GMAP){

  var o ={};

  o.getLatLng = function(pid){
    var res = $http({
      method: 'GET',
      url: GMAP.placeurl,
      params: {
        key: GMAP.key,
        placeid: pid
      }
    }).success(function(data){
      console.log(data);
    });

  }

  return o;

});
