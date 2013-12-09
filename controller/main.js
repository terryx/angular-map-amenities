app.controller('MainCtrl', ['$scope', '$q', '$http', function ($scope, $q, $http) {

    var key = 'AIzaSyAfUEBEEkMoTR7w7AbKjnJI9R5F52izyUg';
    var position = {
        lat: 0,
        lng: 0
    };

    $scope.loading = {
        spinner: null,
        opts: {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '250%', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        },
        start: function(){
            var target = document.getElementById('spin');
            this.spinner = new Spinner(this.opts).spin(target);
            $('#myModal').modal();
        },
        stop: function(){
            this.spinner.stop();
            $('#myModal').modal('hide');
        }
    }

    $scope.types = [
        { id: 'atm|bank', value: 'Bank & ATM'},
        { id: 'bar|cafe|night_club', value: 'Bar & Lounge'},
        { id: 'bakery|food|meal_delivery|meal_takeaway|restaurant|cafe', value: 'Foods' },
        { id: 'amusement_park|aquarium|museum|zoo|shopping_mall|art_gallery|park', value: 'Fun & Travel'},
        { id: 'movie_rental|movie_theater', value: 'Movie'},
        { id: 'shopping_mall|grocery_or_supermarket|clothing_store|shoe_store|jewelry_store|home_goods_store', value: 'Shopping'},
        { id: 'beauty_salon|hair_care|health|spa', value: 'Beauty Centre' },
        { id: 'car_dealer|car_rental|car_repair|car_wash', value: 'Car & Services' },
        { id: 'lodging|rv_park|', value: 'Hotel Accommodation'},
        { id: 'store|bicycle_store|book_store|clothing_store|convenience_store|department_store|electronics_store|furniture_store|hardware_store|home_goods_store|jewelry_store|liquor_store|pet_store|shoe_store|florist|laundry', value:'Retail Store' },
        { id: 'bowling_alley|campground|gym|stadium', value: 'Sports'},
        { id: 'library|school|university', value: 'Schools' },
        { id: 'cemetery|church|funeral_home|hindu_temple|mosque|place_of_worship|synagogue', value: 'Religion'},
        { id: 'airport|bus_station|subway_station|taxi_stand|train_station', value: 'Transportation'},
        { id: 'parking|gas_station', value: 'Parking & Gas Station' },
        { id: 'dentist|health|doctor|hospital|pharmacy|physiotherapist|veterinary_care', value: 'Clinic & Hospital'},
        { id: 'city_hall|courthouse|embassy|establishment|fire_station|local_government_office|police|post_office', value: 'Local Authorities' },
        { id: 'electrician|plumber|locksmith|roofing_contractor|laundry|painter', value: 'Maintenance & Repair'},
        { id: 'accounting|finance|real_estate_agency|lawyer|insurance_agency|general_contractor', value: 'Finance & Firm'},
        { id: 'moving_company|travel_agency|storage', value: 'Travel Agency' }
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