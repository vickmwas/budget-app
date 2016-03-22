var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, $compile) {

    $scope.budget = {
      	"totalAmount" : 0,
      	"categories" : [
      		{"title" : null, "amount" : 0}
      	]
      };

    $scope.onTotalAmountEntered = function(){
        	$scope.remainingAmount = $scope.budget.totalAmount;
      };

    $scope.onFirstAmountEntered = function(){
        $scope.remainingAmount = $scope.budget.totalAmount - $scope.budget.categories[0].amount;
    }

      $scope.click = function() {
          $scope.clicked ++;
          // angular.element('#categoryRow').append($compile(angular.element('#categoryRow').clone())($scope));
      }

});









// app.directive('addDivDirective', function() {
//       return {
//         restrict: 'A',
//         scope: true,
//         template: '<a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="click()"></a>',
//         controller: function($scope, $element, $compile) {
//           $scope.clicked = 0;
//           $scope.click = function() {
//               $scope.clicked ++;

//               // var clone = $('#categoryRow').clone().attr('id', 'categoryRow' + $scope.clicked);

//               // $("#categoryRow1 input#categoryInput").attr('placeholder', 'budget.categories['+$scope.clicked+'].title');
//               // $('#categoryRow').append($compile(clone)($scope));
//               $('#categoryRow').append($compile($('#categoryRow').clone())($scope));
//           }
//         }
//       }

// });


