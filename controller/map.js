app.controller('MapCtrl', ['$scope', '$location', 'storage', function ($scope, $location, storage) {

    var data = storage;

    if (!data.data.geometry) {
        return;
    }
    var location = data.data.geometry.location;

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    directionsDisplay = new google.maps.DirectionsRenderer();
    var coreMap = new google.maps.LatLng(data.currentLocation.lat, data.currentLocation.lng);
    var mapOptions = {
        zoom:14,
        center: coreMap
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    var request = {
        origin: coreMap,
        destination: new google.maps.LatLng(location.lat, location.lng),
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

}]);