'use strict'


var app = angular.module('App', ['ngRoute']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

    $routeProvider
        .when('/about', { templateUrl: '/template/about.html', controller: 'AboutCtrl' })
        .when('/', { templateUrl: '/template/amenity.html', controller: 'AmenityCtrl' })
        .when('/map', { templateUrl: '/template/map.html', controller: 'MapCtrl' })

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
function onGoogleReady() {
    angular.bootstrap(document.getElementById("map"), ['App']);
}