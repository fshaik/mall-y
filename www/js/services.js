angular.module('starter.services', [])

.factory('User', function($http, SERVER, $q) {

  var o = {
    username: false,
    session_id: false,
    favorites:[],
    favBrands:[],
    newFavorites: 0,
    gender: false
  }

  o.addtoFavorites = function(article) {

    var brand = article.brand;
    var likes = 0;

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

  var o ={
    map: false,
    store: false
  };

  o.getLatLng = function(brand) {


    var service;
    var infowindow;

    var pyrmont = new google.maps.LatLng(37.7840297, -122.4074165);
    o.store = brand;

    o.map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

    var request = {
      location: pyrmont,
      radius: '5',
      name: brand
      
    };

    service = new google.maps.places.PlacesService(o.map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(place);
          console.log(place);
         
        }
      }
    };

    function createMarker(place) {

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        label: o.store,
        map: o.map
      });

    }

  }

  return o;

});
