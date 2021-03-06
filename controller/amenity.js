app.controller('AmenityCtrl', ['$scope', '$location', 'storage', function ($scope, $location, storage) {


    $("#menu-close").click(function (e) {
        e.preventDefault();
        $scope.toggleMenu();
    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $scope.toggleMenu();
    });

    $scope.places = [];
    $scope.radiusRange = [
        { id: 500, value: '500m'},
        { id: 1000, value: '1km'},
        { id: 3000, value: '3km'},
        { id: 5000, value: '5km'},
        { id: 10000, value: '10km'},
        { id: 15000, value: '15km'},
        { id: 25000, value: '25km'},
        { id: 50000, value: '50km'}
    ];

    $scope.form.radius = $scope.radiusRange[0]['id'];
    $scope.form.types = $scope.types[0]['id'];
    $scope.search = function () {

        $scope.loading.start();
        $scope.placeSearch($scope.form).then(function (data) {

            $scope.places = data;

            $scope.loading.stop()
            $scope.toggleMenu();
        });
    }

    $scope.goToMap = function (data) {
        storage.data = data;
        $location.path('/map');
    }

    $scope.toggleMenu = function () {
       jQuery("#sidebar-wrapper").toggleClass("active");
    }

}]);