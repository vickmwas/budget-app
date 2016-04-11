var app = angular.module('transactions', []);

app.controller('transactionsCtrl',  function($scope){
	var date = new Date();
	$scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

	var doughnutData = [
				{
					value: 1,
					label: "One"
				},
				{

					value: 2,
					label: "Two"
				},
				{
					value: 3,
					label: "Three"
				},
				{
					value: 4,
					label: "Four"
				},
				{
					value: 5,
					label: "Five"
				}

			];

			window.onload = function(){
				var ctx = document.getElementById("chart-area").getContext("2d");
				window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive : true});
			};


})
