var app = angular.module('budget.controller', ['ionic']);

app.factory('BudgetListFactory',  function($http){
    var allBudgets = function(){
        var response = $http.get('demo/budgets.json')
        .success(function(data){
            return data;
        })
        .error(function() {
          return null;
        });

        return response;
    };

    return {
      getAllBudgets : allBudgets,
    };

});


app.controller('BudgetListCtrl', function($scope, BudgetListFactory){
    var result = BudgetListFactory.getAllBudgets();
    
    result.then(function(response){
      $scope.budgetList = response.data;
      $scope.budgetCount = $scope.budgetList.length;
    });

});



app.controller('BudgetCtrl', function($scope, $compile, $http, $templateCache) {
    $scope.clicked = 0;
    $scope.amountEntered = 0;
    var entered = 0;
    // var x = $scope.clicked;
    $scope.budget = {
        "totalAmount" : 0,
        "categories" : [
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0},
          {"title" : "", "amount" : 0}
        ]
      };


    $scope.onFirstAmountEntered = function(){
      //This is for the Watcher function, which runs like a million times 
      $scope.amountEntered = 0; 

        //We increment the $scope.clicked by 1, because, well, it starts from 0
        //This loop finds the sum of all the budget amounts entered, in order to find the remaining amount
        //Remaining amount = Total amount - Sum of Entered Amounts
        for(var x = 0; x < $scope.clicked+1; x++){
            $scope.amountEntered += $scope.budget.categories[x].amount;
        };

        return $scope.budget.totalAmount - $scope.amountEntered;
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


         rootDiv.append($compile('<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-67">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = "budget.categories['+$scope.clicked+'].title">\
                            </label>\
                      </div>\
                      <div class="col col-20">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()"  ng-model = "budget.categories['+$scope.clicked+'].amount">\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="click()"></a>\
                  </div>\
            </div>')($scope));
    }

      $scope.onBudgetSubmit = function(){
        console.log("This is the amountEntered");
        var loops = $scope.clicked + 1;
        console.log(loops+" loops");
        for(var y = 0; y < loops; y++){
            console.log($scope.budget.categories[y].title + " => " + $scope.budget.categories[y].amount);
        }
      }



});



app.directive('addDivDirective', function() {
      return {
        restrict: 'E',
        template: '<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-67">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = budget.categories[0].title>\
                            </label>\
                      </div>\
                      <div class="col col-20">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()"  ng-model = budget.categories[0].amount >\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="click()"></a>\
                  </div>\
            </div>'
      }
      

});


