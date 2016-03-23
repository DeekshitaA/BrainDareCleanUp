(function(){

  //  The Account Settings controller
angular.module('brainDare')
  .controller('AccountCtrl', function($scope, $state, Auth, $rootScope, quotes, $cordovaLocalNotification) {

    $scope.$on("$cordovaLocalNotification:added", function(id, state, json) {
      alert("Added a notification");
    });

    quotes.getQuote().then(function(res) {
      console.log('res', res);
      $scope.quote = res;//res.data.contents.quotes[0].quote;
    });

    this.add = function() {

      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() + 1);

      var quote = $scope.quote;

      $cordovaLocalNotification.add({
        id: "1234",
        date: alarmTime,
        message: quote,
        title: "Task hahaha",
        autoCancel: true,
        sound: null
      }).then(function () {
        console.log("The notification has been set");
      });
    };

    this.isScheduled = function() {
      $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
        alert("Notification 1234 Scheduled: " + isScheduled);
      });
    };

    this.logout = function (){
      Auth.$unauth();
      $state.go('login');
    };


    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      alert("Successfully registered token " + data.token);
      console.log('Ionic Push: Got token ', data.token, data.platform);
      $scope.token = data.token;
      quotes.getPushNotification($scope.token);
    });
  })

}());
