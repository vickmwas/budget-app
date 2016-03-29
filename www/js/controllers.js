var app = angular.module('starter.controllers', []);

app.controller('BudgetCtrl', function($scope, $compile, $http, $templateCache) {
    $scope.clicked = 0;
    // var clicked = 0;
    $scope.budget = {
        "totalAmount" : 0,
        "categories" : [
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0}
        ]
      };

    $scope.newCategoryNgModel = $scope.budget.categories[$scope.clicked].title;
    $scope.newAmountNgModel = $scope.budget.categories[$scope.clicked].amount;

    
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
    

      $scope.click = function() {
          $scope.clicked++;
          var x = $scope.clicked;

          console.log("val =>" + x) ;

          var rootDiv =  angular.element(document.querySelector('#rootDiv'));

          var newDiv = angular.element(document.querySelector('add-div-directive')).clone();

          var newCategoryNgModel = $scope.budget.categories[x].title;
          var newAmountNgModel = $scope.budget.categories[x].amount;

          // var newCategoryInput = newDiv.children().children().children().children().children()[0];
          console.log(newDiv.children().children().children().children().children()[0].attr('ng-model'));

          // newCategoryInput.attr('ng-model', newCategoryNgModel);

          var newAmountInput = newDiv.children().children().children().children().children()[1];
          // newAmountInput.attr('ng-model', newAmountNgModel);

          // $scope.newCategoryNgModel = $scope.budget.categories[x].title;
          // $scope.newAmountNgModel = $scope.budget.categories[x].amount;

          // newDiv.attr('category-ng-model',$scope.newCategoryNgModel);
          // newDiv.attr('amount-ng-model',$scope.newAmountNgModel);

           rootDiv.append($compile(newDiv)($scope));
      };

});




app.directive('addDivDirective', function() {
      return {
        restrict: 'E',
        scope: {
  
        },
        template: '<div id="categoryRow" ng-controller="BudgetCtrl">\
                  <div class="row">\
                     <div class="col col-67">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = budget.categories[0].title>\
                            </label>\
                      </div>\
                      <div class="col col-20">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()"  placeholder="Amount" ng-model = budget.categories[0].amount >\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="click()"></a>\
                  </div>\
            </div>',
      }
});


