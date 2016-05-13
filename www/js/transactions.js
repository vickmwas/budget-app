app.controller('transactionsCtrl', function($scope,BudgetListFactory, $compile){
	$scope.clicked = 0;
  $scope.pageTitle = "Today's Spendings";
  var date = new Date();

	$scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  $scope.transactionSession = {
    "date" : "",
    "amountLeft":0,
    "originalAmount":0,
    "transactions" : [
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
        {"category" : "","amount" : 0},
    ]

  };

    var getBudgets = BudgetListFactory.getAllBudgets();

    $scope.budgetList = JSON.parse(getBudgets);
    $scope.data = {
      selectedBudget:null,
      BudgetAmount:0
    };

  $scope.currentBudget = {};
  $scope.originalAmount = null;




  $scope.onBudgetSelected = function () {
    /**Loop Through The Stored Budgets, Retrieving the Details for the budget that has been selected
    */
    for (var x = 0; x < $scope.budgetList.length; x++){
      if(($scope.budgetList)[x].budgetTitle == $scope.data.selectedBudget){
        console.log("Selected => ",$scope.data.selectedBudget);

        // $scope.data.BudgetAmount = ($scope.budgetList)[x].budgetAmount;
        $scope.currentBudget = ($scope.budgetList)[x];
        $scope.pageTitle =  $scope.onFirstAmountEntered() + "/"+ $scope.currentBudget.budgetAmount + " Remaining";
      }

    }

  }

  $scope.originalAmount = $scope.currentBudget.budgetAmount;

  $scope.onFirstAmountEntered = function(){
    //This is for the Watcher function, which runs like a million times
    $scope.amountEntered = 0;

    //We increment the $scope.clicked by 1, because, well, it starts from 0
    //This loop finds the sum of all the budget amounts entered, in order to find the remaining amount
    //Remaining amount = Total amount - Sum of Entered Amounts
    for(var x = 0; x < $scope.clicked+1; x++){
      $scope.amountEntered += $scope.transactionSession.transactions[x].amount;
    };

    return $scope.currentBudget.budgetAmount - $scope.amountEntered;
  }



    $scope.showAttr = function(obj) {
        var id = obj.target.attributes;
        console.log(id);
    }



    $scope.addRow = function(){
        $scope.clicked++;

        var rootDiv =  angular.element(document.querySelector('#rootDiv'));

        var newDiv = angular.element(document.querySelector('add-div-directive')).clone();

          rootDiv.append($compile('<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-50">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = "transactionSession.transactions['+$scope.clicked+'].category">\
                            </label>\
                      </div>\
                      <div class="col col-33">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()" placeholder="0.00" ng-model = "transactionSession.transactions['+$scope.clicked+'].amount">\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="addRow()"></a>\
                  </div>\
            </div>')($scope));

    }

  $scope.onTransactionsSubmitted = function () {
    console.log($scope.selectedBudget);
  }
});

app.directive('addTransactionsDiv', function() {
      return {
        restrict: 'E',
        template: '<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-50">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = "transactionSession.transactions[0].category">\
                            </label>\
                      </div>\
                      <div class="col col-33">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()" placeholder="0.00" ng-model = "transactionSession.transactions[0].amount">\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="addRow()"></a>\
                  </div>\
            </div>'
      }


});
