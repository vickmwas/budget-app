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
    // var x = $scope.clicked;
    $scope.budget = {
        "totalAmount" : 0,
        "categories" : [
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""},
          {"title" : "", "amount" : ""}
        ]
      };

    
    $scope.onTotalAmountEntered = function(){
        	$scope.remainingAmount = $scope.budget.totalAmount;
      };

    $scope.onFirstAmountEntered = function(){
        for(var x = 0; x < $scope.clicked; x++){
            $scope.budget.totalAmount += $scope.budget.categories[x].amount;
        }
        return $scope.budget.totalAmount;
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

          var rootDiv =  angular.element(document.querySelector('#rootDiv'));

          // var amountArray = rootDiv.children().children().children().children().children().children();
          var amountArray = rootDiv;
          
          console.log("length is " + amountArray);
          for (var i = 0; i < amountArray.length; i++) {
              console.log("Input => " + angular.element(amountArray[i]).val());
          };
          // console.log(amountArray);
  
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


