var app = angular.module('transactions', []);

app.controller('transactionsCtrl',  function($scope){
	var date = new Date();
	$scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
})
