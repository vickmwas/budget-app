// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','ngCordova','chartjs-directive']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // $cordovaPlugin.someFunction().then(success, error);

    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'index.html'
      })

    .state('budget', {
      url: '/budget',
      templateUrl: 'templates/budget.html',
      controller: 'BudgetCtrl'
    })

    .state('budgetList', {
      url: '/budget_list',
      templateUrl: 'templates/budgetsList.html',
      controller: 'BudgetListCtrl'
    })

    .state('transaction', {
      url : '/transaction',
      templateUrl: 'templates/dailyTransactions.html',
      controller:'transactionsCtrl'
    })

    .state('analysis', {
      url : '/analysis'
    })

    .state('signup', {
      url : '/signup',
      templateUrl:'templates/signup.html',
      controller:'SignupCtrl'
    })

    .state('login', {
      url : '/login',
      templateUrl:'templates/login.html',
      controller:'LoginCtrl'
    })

    .state('todo', {
      url : '/todo',
      templateUrl:'templates/todo.html',
    })



  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
