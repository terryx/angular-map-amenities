app.controller('AmenityCtrl', ['$scope', function($scope){
    var slider = $("#radius").slider({
        min: 10,
        max: 50000,
        value: 1000
    });

    $scope.places = [];

    $scope.search = function(){
      var radius = slider.slider('getValue');

        $scope.form.radius = radius;

        console.log($scope.form)

       $scope.placeSearch($scope.form).then(function(data){

           $scope.places = data;
//           for(var i = 0, len=data.length; i<len; i++) {
//
//               $scope.places
//
//           }

       });

    }

//    var promise = $scope.getLocation();
//
//    promise.then(function(data){
//        console.log(data)
//
//    })
}]);