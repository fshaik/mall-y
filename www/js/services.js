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
    queue: [],
    page: 0,
    limit:10
  };

  o.init = function () {
    if(o.queue.length == 0 ) {

      return o.getNextArticles(o.limit,o.page);
    }

  }

  o.getNextArticles = function(limitnum, skipnum){
    return $http({
      method: 'GET',
      url: SERVER.url + '/article',
      params:{sort:'rand', limit: limitnum, skip: skipnum}
    }).success(function(data){
      o.queue = o.queue.concat(data);
      o.nextArticle();
    });
  };

  o.nextArticle = function() {
    o.queue.shift();

    console.log(o.queue);

    if(o.queue.length <= 3) {
      o.page+= 1;
      o.getNextArticles(o.limit,o.page * o.limit);
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
        zoom: 17,
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
          var place = results[0];
          createMarker(place);
          console.log(place);
         
      }
    };

    function createMarker(place) {

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        label: o.store,
        map: o.map
      });

      o.map.panTo(place.geometry.location);

    }

  }

  return o;

});
