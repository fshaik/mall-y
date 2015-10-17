angular.module('starter.controllers', [])

.controller('MallMapCtrl', function($scope, MallMap){

  MallMap.getLatLng('ChIJ6zMe3oWAhYARDbx_ONr6TWY');

    var myLatlng = new google.maps.LatLng(37.7840297, -122.4074165);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.map = map;

})

.controller('SplashCtrl', function($scope, $state, User){


  $scope.startWindowShop = function(gender) {


    User.gender = gender;

    $state.go('tab.windowshop');

  }



})

.controller('WindowShopCtrl', function($scope, $timeout, Recommendations, User,$ionicPopup, MATCH_NUM, $state ){



  Recommendations.init()
    .then(function(){
      $scope.currentArticle = Recommendations.queue[0];
      //Recommendations.playCurrentSong();
    }).then(function (){
      //hideLoading();
      //$scope.currentSong.loaded = true;
    });

  //$scope.currentArticle = $scope.articles[0];


  $scope.sendFeedback = function(like) {

    $scope.currentArticle.rated = like;
    $scope.currentArticle.hide = true;

    if(like) {

      User.addtoFavorites($scope.currentArticle);

      if(!(User.favorites[$scope.currentArticle.brand] % MATCH_NUM) )
        $scope.showMatch($scope.currentArticle.brand, User.favorites[$scope.currentArticle.brand]);

    }


    Recommendations.nextArticle();

    $timeout(function(){

    
      $scope.currentArticle = Recommendations.queue[0];;
      $scope.currentArticle.hide = false;
      console.log($scope.currentArticle);

    }, 50);

  }

  $scope.showMatch = function(brand, likes) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'You Like Zara!',
      template: "You've Liked " + likes + " Items by " + brand + "<p><p>Shop There Now?"
    });


    confirmPopup.then(function(res) {
      if(res) {
       $state.go('tab.mallmap');
      } else {
       console.log('You are not sure');
      }  
    });

 };


});
