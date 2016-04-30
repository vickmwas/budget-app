app.controller('transactionsCtrl', function($scope,BudgetListFactory, $compile){
	$scope.clicked = 0;
  var date = new Date();

	$scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  $scope.transactionSession = {
    "date" : "",
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
	// var data = {
 //      labels : ["January","February","March","April","May","June","July"],
 //      datasets : [
 //        {
 //          fillColor : "rgba(220,220,220,0.5)",
 //          strokeColor : "rgba(220,220,220,1)",
 //          pointColor : "rgba(220,220,220,1)",
 //          pointStrokeColor : "#fff",
 //          data : [65,59,90,81,56,55,40]
 //        },
 //        {
 //          fillColor : "rgba(151,187,205,0.5)",
 //          strokeColor : "rgba(151,187,205,1)",
 //          pointColor : "rgba(151,187,205,1)",
 //          pointStrokeColor : "#fff",
 //          data : [28,48,40,19,96,27,100]
 //        }
 //      ]
 //    };

 //    $scope.myChart = data;

    var result = BudgetListFactory.getAllBudgets();
    
    result.then(function(response){
      $scope.budgetList = response.data;
    });

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
