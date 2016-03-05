(function() {
  angular.module('brainDare')

    .constant('FIREBASE_URI', 'https://boiling-heat-1945.firebaseio.com')

    .factory('Auth', function($firebaseAuth) {
      var endPoint = 'https://boiling-heat-1945.firebaseio.com';
      var usersRef = new Firebase(endPoint);
      return $firebaseAuth(usersRef);
    })

    .factory('firebaseData', function($firebase, FIREBASE_URI) {
      var ref = new Firebase(FIREBASE_URI);

      var users = function() {
        return ref.child('users');
      }

      var getDares = function(){
        return ref.child('dares');
      }

      return {
        getUsers : users,
        getDares : getDares
      }

    })
    //  Common service with the CRUD for user dares

    .factory('brainDareService', function($firebaseArray, FIREBASE_URI) {

      var ref = new Firebase(FIREBASE_URI);
      var dares = ref.child('dares');
      var items = $firebaseArray(dares);
      var user = ref.getAuth();

      var getUser = function(){
        return user;
      };

      var getItems = function() {
        return items;
      };

      var numChildren = function(){
        return dares.numChildren();
      };

      var addItem = function(item) {
        return items.$add(item);
      };

      var updateItem = function(id) {
        return items.$save(id);
      };

      var removeItem = function(id) {
        return items.$remove(id);
      };

      return {
        getItems : getItems,
        getUser : getUser,
        numChildren: numChildren,
        addItem : addItem,
        updateItem : updateItem,
        removeItem : removeItem
      }

    })

    .service('quotes', function($http){
      var quote = {};
      this.getQuote = function(){
        return  $http.get('http://quotes.rest/qod.json?category=inspire').then(function(result){
          console.log('quote categories result: ' ,result);
          quote = result.data.contents.quotes[0].quote;
          return quote;
        });
      }

      this.getPushNotification = function(token) {

        var token = token;
        var quote = this.getQuote();
        return $http({
          method: 'POST',
          url: 'https://push.ionic.io/api/v1/push ',
          headers: {
            'Content-Type': 'application/json',
            'X-Ionic-Application-Id': 'b90389e8'
          },
          data: {
            "tokens":[
              token
            ],
            "notification":{
              "alert":quote,
              "ios":{
                "badge":1,
                "sound":"ping.aiff",
                "expiry": 1423238641,
                "priority": 10,
                "contentAvailable": 1,
                "payload":{
                  "key1":"value",
                  "key2":"value"
                }
              },
              "android":{
                "collapseKey":"foo",
                "delayWhileIdle":true,
                "timeToLive":300,
                "payload":{
                  "key1":"value",
                  "key2":"value"
                }
              }
            }
          }
        }).then(function successCallback(response) {
          console.log(response.data);
        }, function errorCallback(response) {
          console.log("Oopies there seems to be an error");
        });

      }

    });

}());

