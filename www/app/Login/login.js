(function(){
  'use strict';

  angular.module('brainDare')

    .controller('loginCtrl', function($scope, $state, Auth, firebaseData, ionicMaterialInk, ionicMaterialMotion){


      ionicMaterialInk.displayEffect();

      ionicMaterialMotion.ripple();

      $scope.user = Auth.$getAuth();
      $scope.usersData = firebaseData.getUsers();
      $scope.isNewFBUser = false;
      if ($scope.user) {
        console.log($scope.user);
      }

      this.facebook = function() {
        Auth.$authWithOAuthPopup("facebook").then(function(authData){
          $scope.isNewFBUser = true;
          console.log(authData);
          $state.go('dare.list');
        }).catch(function(error){
          console.error(error);
        },{
          // remember: "sessionOnly",
          scope: "email,user_likes"
        });

      };

      this.emailLogin = function(email, pwd) {

        Auth.$authWithPassword({
          email    : email,
          password : pwd
        }).then(function(authData) {
          console.log(authData);
          $state.go('dare.list');
        }).catch(function(error) {
          console.log(error);
        });
      };


      this.logout = function (){

        Auth.$unauth();

      };

      Auth.$onAuth(function(authData) {

        if (authData && $scope.isNewFBUser) {
          // save the user's profile into Firebase so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          $scope.usersData.child(authData.uid).set({
            userId: authData.uid,
            provider: authData.provider,
            name: authData.facebook.displayName
          });
          $scope.isNewFBUser = false;
        }

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
