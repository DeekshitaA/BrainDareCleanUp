(function(){
  'use strict';

  angular.module('brainDare')

    .controller('registerCtrl', function($scope, Auth, firebaseData, $state){

      $scope.usersData = firebaseData.getUsers();

      this.addUser = function(email, pwd, name) {

        Auth.$createUser({
          email: email,
          password: pwd
        }).then(function (userData) {
          console.log("User " + userData.uid + " created successfully!");
          $scope.isNewUser = true;
          $scope.name = name;
          return Auth.$authWithPassword({
            email: email,
            password: pwd
          });
        }).then(function (authData) {
          console.log("Logged in as:", authData.uid);
          $scope.usersData.child(authData.uid).set({
            userId: authData.uid,
            provider: authData.provider,
            name: name,
            email: email
            //some more user data
          });
          $state.go('tab.dash');
        }).catch(function (error) {
          console.error("Error: ", error);
        });
      };

      Auth.$onAuth(function(authData) {
        if (authData === null) {
          console.log('Not logged in yet');
        } else {
          console.log('Logged in as', authData.uid);
          //  $location.path("/profile");
        }
        // This will display the user's name in our view
        $scope.authData = authData;
        console.log('authData', $scope.authData);
      });

    })

}());
