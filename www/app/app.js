angular.module("brainDare",
  [
    'ionic',
    'ionic-material',
    'ngCordova',
    'firebase',
    'base64'
  ])

  .run(function($ionicPlatform, $http, $base64) {

      $ionicPlatform.ready(function() {

        $http.defaults.headers.post['Authorization'] = 'Basic ' + $base64.encode('15fc98fdd99c51bdfb62cc3310d26dc145a5195f04c76fac' + ':' + '');
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
        if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }

        //window.plugin.notification.local.onadd = function (id, state, json) {
        //  var notification = {
        //    id: id,
        //    state: state,
        //    json: json
        //  };
        //  $timeout(function() {
        //    $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
        //  });
        //};
  });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        controllerAs: 'login',
        templateUrl: 'app/Login/login.html',
      })

      .state('register', {
        url: '/register',
       // controller: 'registerCtrl as register',
        templateUrl: 'app/Register/register.html',
      })

      // setup an abstract state for the dare v  tabs directive
      .state('dare', {
        url: '/dare',
        abstract: true,
        templateUrl: 'app/Dares/dare-tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('dare.list', {
        url: '/list',
        views: {
          'dare-list': {
            templateUrl: 'app/Dares/dares-list.html',
            controller: 'DareListCtrl as dareList'
          }
        }
      })

      .state('dare.account', {
        url: '/account',
        views: {
          'dare-account': {
            templateUrl: 'app/Account/account.html',
         //   controller: 'AccountCtrl as account'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
