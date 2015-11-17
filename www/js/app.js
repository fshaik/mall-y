// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
  .state('splash', {
    url: '/',
    templateUrl: 'templates/splash.html',
    controller: 'SplashCtrl',

  })

  .state('tab.windowshop', {
    url: '/windowshop',
    views: {
      'tab-windowshop': {
        templateUrl: 'templates/windowshop.html',
        controller: 'WindowShopCtrl'
      }
    }

  })

  .state('tab.mallmap', {
   url: '/mallmap',
    views: {
      'tab-mallmap': {
        templateUrl: 'templates/tab-mallmap.html',
        controller: 'MallMapCtrl'
      }
    }
  })
  .state('tab.shoppingbag', {
    url:'/shoppingbag',
    views: {
      'tab-shoppingbag' : {
        templateUrl: 'templates/shoppingbag.html',
        controller: 'ShoppingBagCtrl'
        
      }

    },
    onEnter: function( User){
      if(User)
        User.getUserShoppingBag(User.authData.uid).then(function(){
          console.log(User.shoppingBagArticles);
        });
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}

)

.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://tranquil-falls-5429.herokuapp.com',
  userUrl: "https://goaapp.firebaseio.com/"
})

.constant('MATCH_NUM', 3)
.constant('GMAP', {

  placeurl:'https://maps.googleapis.com/maps/api/place/textsearch/json',
  key:'AIzaSyD9HnlrhV-p27OCq3ivBjg_N4_nSTf6UWc'
});
