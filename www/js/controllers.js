angular.module('starter.controllers', [])

.controller('MallMapCtrl', function($scope, MallMap, User){
  
  console.log(User.favBrands);
  MallMap.getLatLng(User.favBrands[0]);
  $scope.map = MallMap.map;

  $scope.$on('$ionicView.enter', function(){
    MallMap.getLatLng(User.favBrands[0]);
  })


})

.controller('SplashCtrl', function($scope, $state, User){


  $scope.startWindowShop = function(gender) {


    User.gender = gender;


    $state.go('tab.windowshop');

  }



})

.controller('WindowShopCtrl', function($scope, $timeout, Recommendations, User,$ionicPopup, MATCH_NUM, $state, $ionicLoading ){

  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class= "ion-loading-c"><i>',
      noBackdrop:true
    });

    User.auth();
  };

  var hideLoading = function() {
      $ionicLoading.hide();
  };

  showLoading();

  Recommendations.init()
    .then(function(){
      $scope.currentArticle = Recommendations.queue[0];
      

    }).then(function (){
      hideLoading();
      //$scope.currentSong.loaded = true;
    });


  $scope.sendFeedback = function(like) {

    $scope.currentArticle.rated = like;
    $scope.currentArticle.hide = true;

    if(like) {

      User.addtoFavorites($scope.currentArticle);

      if(!(User.favorites[$scope.currentArticle.brand] % MATCH_NUM) ) {
        User.favBrands.unshift($scope.currentArticle.brand);
        $scope.showMatch($scope.currentArticle.brand, User.favorites[$scope.currentArticle.brand]);
      }

    }


    Recommendations.nextArticle();

    $timeout(function(){

    
      $scope.currentArticle = Recommendations.queue[0];;
      //$scope.currentArticle.hide = false;
      //console.log($scope.currentArticle);

    }, 250);

    $scope.nextArticleImg = function() {
      if(Recommendations.queue.length > 1) {
        return Recommendations.queue[1].imgurl;
      }

      return '';
    }



  };

  $scope.showMatch = function(brand, likes) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'You Like ' + brand +'!',
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




})

.controller('ShoppingBagCtrl', function($scope, User) {

  
$scope.items = User.shoppingBagArticles

  

});
