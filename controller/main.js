app.controller('MainCtrl', ['$scope', '$q', '$http', function ($scope, $q, $http) {

    var key = 'AIzaSyAfUEBEEkMoTR7w7AbKjnJI9R5F52izyUg';
    var position = {
        lat: 0,
        lng: 0
    };

    $scope.types = [
        { id: 'accounting', value: 'Accounting' },
        { id: 'airport', value: 'Airport' },
        { id: 'amusement_park', value: 'Amusement Park' },
        { id: 'aquarium', value: 'Aquarium' },
        { id: 'art_gallery', value: 'Art Gallery' },
        { id: 'atm', value: 'ATM' },
        { id: 'bakery', value: 'Bakery' },
        { id: 'bank', value: 'Bank' }
//        'bank',
//        'bar',
//        'beauty_salon',
//        'bicycle_store',
//        'book_store',
//        'bowling_alley',
//        'bus_station',
//        'cafe',
//        'campground',
//        'car_dealer',
//        'car_rental',
//        'car_repair',
//        'car_wash',
//        'casino',
//        'cemetery',
//        'church',
//        'city_hall',
//        'clothing_store',
//        'convenience_store',
//        'courthouse',
//        'dentist',
//        'department_store',
//        'doctor',
//        'electrician',
//        'electronics_store',
//        'embassy',
//        'establishment',
//        'finance',
//        'fire_station',
//        'florist',
//        'food',
//        'funeral_home',
//        'furniture_store',
//        'gas_station',
//        'general_contractor',
//        'grocery_or_supermarket',
//        'gym',
//        'hair_care',
//        'hardware_store',
//        'health',
//        'hindu_temple',
//        'home_goods_store',
//        'hospital',
//        'insurance_agency',
//        'jewelry_store',
//        'laundry',
//        'lawyer',
//        'library',
//        'liquor_store',
//        'local_government_office',
//        'locksmith',
//        'lodging',
//        'meal_delivery',
//        'meal_takeaway',
//        'mosque',
//        'movie_rental',
//        'movie_theater',
//        'moving_company',
//        'museum',
//        'night_club',
//        'painter',
//        'park',
//        'parking',
//        'pet_store',
//        'pharmacy',
//        'physiotherapist',
//        'place_of_worship',
//        'plumber',
//        'police',
//        'post_office',
//        'real_estate_agency',
//        'restaurant',
//        'roofing_contractor',
//        'rv_park',
//        'school',
//        'shoe_store',
//        'shopping_mall',
//        'spa',
//        'stadium',
//        'storage',
//        'store',
//        'subway_station',
//        'synagogue',
//        'taxi_stand',
//        'train_station',
//        'travel_agency',
//        'university',
//        'veterinary_care',
//        'zoo'
    ];
    $scope.form = {};

    $scope.getGeoLocation = function () {

        var q = $q.defer();

        if (position.lat != 0 && position.lng != 0) {
            q.resolve(position);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                var data = {
                    'lat': position.coords.latitude,
                    'lng': position.coords.longitude
                }

                q.resolve(data);
            });
        } else {
            q.resolve();
        }

        return q.promise;
    }

    $scope.placeSearch = function (params) {

        var q = $q.defer();

        if (!params) {
            return;
        }

        console.log(params)
        var promise = $scope.getGeoLocation().then(function (position) {

            var url = '';

            if (!position.lat || !position.lng) {
                return;
            }

            if (!params.radius) {
                return;
            }

            if (!params.sensor) {
                params.sensor = false;
            }

            url += 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
            url += 'location=' + position.lat + ',' + position.lng;
            url += '&radius=' + params.radius;
            url += '&sensor=' + params.sensor;
            url += '&key=' + key;

            if (params.keyword) {
                url += '&keyword=' + params.keyword;
            }

            if (params.language) {
                url += '&language=' + params.language;
            }

            if (params.minprice) {
                url += '&minprice=' + params.minprice;
            }

            if (params.maxprice) {
                url += '&maxprice=' + params.maxprice;
            }

            if (params.name) {
                url += '&name=' + params.name;
            }

            if (params.opennow) {
                url += '&opennow=' + params.opennow;
            }

            if (params.types) {
                url += '&types=' + params.types;
            }

            if (params.pagetoken) {
                url += '&pagetoken=' + params.pagetoken;
            }

            if (params.zagatselected) {
                url += '&zagatselected=' + params.zagatselected;
            }

            return url;
        });

        promise.then(function (url) {

            $http.get("/ajax.php", { params: { url: url }}).then(function (response) {

                q.resolve(response.data.results);
            }, function (response) {
                q.resolve(response);
            })

        })

        return q.promise;
    }


}]);