(function(){

  angular.module('brainDare')

    .controller('DareListCtrl', function($scope,brainDareService, $state, Auth, firebaseData, ionicMaterialInk, ionicMaterialMotion, quotes) {

      ionicMaterialInk.displayEffect();

      ionicMaterialMotion.fadeSlideIn();
      quotes.getQuote().then(function(res) {
        console.log('res', res);
        $scope.quote = res;//res.data.contents.quotes[0].quote;
      });

      $scope.user = brainDareService.getUser();
      this.showSelfDares = false;

      this.getQuoteCat = function() {
        quotes.getQuote().then(function(res) {
          console.log('res', res);
          $scope.quote = res;//res.data.contents.quotes[0].quote;
        });
        console.log('this.quote', $scope.quote);
      };


      Auth.$onAuth(function(authData) {

        if (authData === null) {
          console.log('Not logged in yet');
        } else {
          $scope.uid = authData.uid;
          console.log('Logged in as', authData.uid);
          console.log('User info : ', $scope.user);
        }
        // This will display the user's name in our view
        $scope.authData = authData;
      });

      this.selfDares = function(){
        if($scope.count && $scope.count > 0 && !this.showSelfDares){
          this.showSelfDares = true;
        } else if(this.showSelfDares === true){
          this.showSelfDares = false;
        }
      };

      this.addDare = function(){
        $state.go('dare.add');
      };

      this.items = brainDareService.getItems();

      this.items.$loaded().then(function(dares) {
        console.log('dares: ' , dares); // data is loaded here
        $scope.count = 0;
        for(var i = 0; i < dares.length; i++){
          if($scope.uid == dares[i].by)
            $scope.count ++;
        }
      });

      this.removeItem = function (id) {
        brainDareService.removeItem(id);
      };

    })


}());
