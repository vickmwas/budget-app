app.controller('SignupCtrl',  function($scope,$cordovaToast,$ionicPlatform,$rootScope){
	$scope.pageTitle = "Create An Account";

  $scope.userDetails = {
    "username" : "",
    "email" : "",
    "password" : ""
  };

  $scope.onSignUpButtonClicked = function(){
    console.log("Name => " + $scope.userDetails.username);
    console.log("Email => " + $scope.userDetails.email);
    console.log("Password => " + $scope.userDetails.password);


    window.localStorage.setItem("name", $scope.userDetails.username);
    window.localStorage.setItem("email", $scope.userDetails.email);
    window.localStorage.setItem("password", $scope.userDetails.password);
    window.localStorage.setItem("object",JSON.stringify($scope.userDetails) );

    $ionicPlatform.ready(function(){

      $cordovaToast.show('Saved The following Data: \n' +
      'Name =' + $scope.userDetails.username + '\n' +
      'Email = ' + $scope.userDetails.email + '\n' +
      'Password = ' + $scope.userDetails.password, 'long', 'bottom').then(function (success) {}, function (error) {});
    });
  }


  $rootScope.isLoggedIn = function(){
    if(window.localStorage.getItem("name") != undefined &&
       window.localStorage.getItem("email") != undefined &&
       window.localStorage.getItem("password") != undefined) {
        return true; }
    else {
        return false;
    }

  }




});



app.controller('LoginCtrl', function($scope,$rootScope){
	$scope.pageTitle = "Log In"

  if($rootScope.isLoggedIn()){
    console.log("Yeah!1");
  }else{
    console.log("Naah");
  }
});
