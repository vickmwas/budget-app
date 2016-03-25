var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, $compile, $http, $templateCache) {

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

    $scope.showAttr = function(obj) {
        var id = obj.target.attributes;
        console.log(id);
    }

      var newDiv;
      $scope.clicked = 0;
      $scope.click = function() {
          $scope.clicked ++;

          var rootDiv =  angular.element(document.querySelector('#categoryRow'));

          // var x = null;
          // $http.get('templates/newrow.html').then(function(response){
          //       x = response.data;
          //       console.log(x); 
          // });


          var newDiv = rootDiv.clone();

          var newCategoryNgModel = 'budget.categories['+ $scope.clicked +'].title';
          var newAmountNgModel = 'budget.categories['+ $scope.clicked +'].amount';

          var newCategoryInput = newDiv.children().children().children().children("input#categoryInput");
          console.log("categoryInput -> " + newCategoryInput);

          var newAmountInput = newDiv.children().children().children().children("input#amountInput");
          console.log("amountInput -> " + newAmountInput);

          newCategoryInput.attr('ng-model', newCategoryNgModel);
          newAmountInput.attr('ng-model', newAmountNgModel);
          

          rootDiv.append($compile(newDiv)($scope));

          console.log($scope.budget);
          // angular.element(document.('#categoryRow')).append($compile(angular.element(document.querySelector('#categoryRow') ).clone()) ($scope));
      }

});




app.directive('addDivDirective', function() {
      return {
        restrict: 'A',
        scope: true,
        template: '<div id="categoryRow">'+
                  '<div class="row">'+
                     '<div class="col col-67">'+
                            '<label class="item item-input">'+
                              '<input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model="setNgModel()" >'+
                            '</label>'+
                      '</div>'+

                      '<div class="col col-20">'+
                            '<label class="item item-input">'+
                              '<input type="text" id="amountInput" ng-focus="showAttr($event)"  placeholder="Amount" ng-model="budget.categories[clicked].amount" >'+
                            '</label>'+
                      '</div>'+
                      
                      '<a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="click()"></a>'+
                  '</div>'+
            '</div>',

          controller: function($scope, element, $compile) {
              $scope.clicked = 0;
              $scope.budget = {
                "totalAmount" : 0,
                "categories" : [
                  {"title" : null, "amount" : 0}
                  ]
              };

              $scope.showAttr = function(obj) {
                  var id = obj.target.attributes;
                  console.log(id);
              }

              $scope.click = function() {
                  $scope.clicked ++;
                  console.log("val =>" + $scope.clicked) ;
                  var rootDiv =  angular.element(document.querySelector('#categoryRow'));
                   var newDiv = rootDiv.clone();
                   
                   rootDiv.append($compile(newDiv)($scope));
              };

              $scope.setNgModel = function(){
                $scope.clicked ++;
                  return "a";
              }

              
        },

      }

});


