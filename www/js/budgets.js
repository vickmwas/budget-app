
app.factory('BudgetListFactory',  function($http){
  var allBudgets = function(){
    // var response = $http.get('demo/budgets.json')
    //   .success(function(data){
    //     return data;
    //   })
    //   .error(function() {
    //     return null;
    //   });


    return window.localStorage.getItem("budgetsObject");

  };

  return {
    getAllBudgets : allBudgets
  };

});


app.controller('BudgetListCtrl', function($scope, BudgetListFactory){
  var getBudgets = BudgetListFactory.getAllBudgets();
  console.log(getBudgets);
  $scope.budgetList = JSON.parse(getBudgets);
    if($scope.budgetList != undefined){
      $scope.budgetCount = $scope.budgetList.length;
    }



});



app.controller('BudgetCtrl', function($scope, $compile, $http, $templateCache, BudgetListFactory, $cordovaToast,$ionicPlatform, $cordovaSQLite, $rootScope) {
  $rootScope.budgetVar = [];

  if(window.localStorage.getItem("budgetsObject") == undefined){
    window.localStorage.setItem("budgetsObject",JSON.stringify($rootScope.budgetVar));
  }

  var storedObj =window.localStorage.getItem("budgetsObject");
  var newObjectID = (storedObj.length)-1;


  $scope.clicked = 0;
  $scope.amountEntered = 0;

  // var x = $scope.clicked;
  $scope.budget = {
    "budgetID" : newObjectID,
    "budgetTitle":"",
    "budgetAmount":0,
    "budgetStartDate": "",
    "budgetEndDate" : "",
    "items" : [
      {"title" : "", "amount" : 500},
      {"title" : "", "amount" : 500},
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
      $scope.amountEntered += $scope.budget.items[x].amount;
    };

    return $scope.budget.budgetAmount - $scope.amountEntered;
  }



  $scope.showAttr = function(obj) {
    var id = obj.target.attributes;
    console.log(id);
  }

  $scope.addRow = function() {
    $scope.clicked++;
    console.log("Clicked = ",$scope.clicked);

    var newBudgetObj = {"title" : "","amount" : 0};

    var rootDiv =  angular.element(document.querySelector('#rootDiv'));

    var newDiv = angular.element(document.querySelector('add-div-directive')).clone();


    rootDiv.append($compile('<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-50">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = "budget.items['+$scope.clicked+'].title">\
                            </label>\
                      </div>\
                      <div class="col col-33">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()" placeholder="0.00" ng-model = "budget.items['+$scope.clicked+'].amount">\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="addRow()"></a>\
                  </div>\
            </div>')($scope));


  }



  $scope.onBudgetSubmit = function(){
    $ionicPlatform.ready(function() {
      var numberOfBudgets = ($scope.clicked) + 1;

      if ($scope.budget.budgetTitle == ""){
        alert("Enter The Budget Name First!");
      }else if($scope.budget.budgetStartDate == ""){
        alert("Select The Start Date First!");
      }else if ($scope.budget.budgetEndDate == ""){
        alert("Select The End Date First!");
      }else if ($scope.budget.budgetAmount == 0){
        alert("Enter The Budget Amount!");
      }else{

        var getBudgets = JSON.parse(window.localStorage.getItem("budgetsObject"));

        // if(getBudgets == "[]"){
        //   getBudgets = JSON.parse(getBudgets);
        // }

        if(getBudgets != undefined){

          var storedBudget = getBudgets;
          var objLength = storedBudget.length;
          alert(objLength + "objects Stored");

          //Split the original budget array to only the items the user has entered
          ($scope.budget.items).splice(numberOfBudgets, (20-numberOfBudgets));

          storedBudget.push($scope.budget);
          window.localStorage.setItem("budgetsObject",JSON.stringify(storedBudget));

          $cordovaToast.show("Your Budget Has Been Successfully Stored!", 'long', 'bottom').then(function (success) {}, function (error) {});
          window.location.href = "#/budget_list";
        }


      }




      //

    });//end of IonicReady function


  }//End of function

});



app.directive('addDivDirective', function() {
  return {
    restrict: 'E',
    template: '<div id="categoryRow">\
                  <div class="row">\
                     <div class="col col-50">\
                            <label class="item item-input">\
                              <input type="text" id="categoryInput" ng-focus="showAttr($event)"  placeholder="Category" ng-model = budget.items[0].title>\
                            </label>\
                      </div>\
                      <div class="col col-33">\
                            <label class="item item-input">\
                              <input type="number" id="amountInput" ng-focus="showAttr($event)" ng-blur="onFirstAmountEntered()" placeholder="0.00" ng-model = budget.items[0].amount >\
                            </label>\
                      </div>\
                      <a class="button button-icon icon ion-plus-circled" id="addRowButton" ng-click="addRow()"></a>\
                  </div>\
            </div>'
  }


});


