var app = angular.module('budget.controller', []);

app.controller('BudgetCtrl', function($scope, $compile, $http, $templateCache) {
    $scope.clicked = 0;
    // var clicked = 0;
    $scope.budget = {
        "totalAmount" : 0,
        "categories" : [
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
          {"title" : null, "amount" : 0},
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
        return $scope.budget.totalAmount - $scope.budget.categories[0].amount;
    }

    $scope.showAttr = function(obj) {
        var id = obj.target.attributes;
        console.log(id);
    }
    

      $scope.click = function() {
          $scope.clicked++;

          console.log("val =>" + $scope.clicked) ;

          var rootDiv =  angular.element(document.querySelector('#rootDiv'));

          var newDiv = angular.element(document.querySelector('add-div-directive')).clone();

          var newCategoryNgModel = $scope.budget.categories[$scope.clicked].title;
          var newAmountNgModel = $scope.budget.categories[$scope.clicked].amount;

          var newCategoryInput = angular.element(newDiv.children().children().children().children().children()[0]);
          newCategoryInput.removeAttr('ng-model').attr('ng-model', newCategoryNgModel);

          var newAmountInput = angular.element( newDiv.children().children().children().children().children()[1] );
          newAmountInput.removeAttr('ng-model').attr('ng-model', newAmountNgModel);

           rootDiv.append($compile(newDiv)($scope));
      }

      $scope.onBudgetSubmit = function(){

          var rootDiv =  angular.element(document.querySelector('#rootDiv'));

          var amountArray = rootDiv.children().children().children().children().children().children();

          console.log(amountArray);
          console.log("Clicked = "+ $scope.clicked);
      }

});




app.directive('addDivDirective', function() {
      return {
        restrict: 'E',
        scope: {
  
        },
        template: '<div id="categoryRow" ng-controller="BudgetCtrl" ng-init = "clicked = 0">\
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


