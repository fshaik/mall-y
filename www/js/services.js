angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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

});
