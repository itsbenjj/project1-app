
var restaurantResultList = [], savedResult, selection;

// var savedConcert = localStorage.getItem("selectedIndex");
// savedConcert= JSON.parse(savedConcert);

//FOR TESTING
var savedConcert = {lat:-33.856159, lng:151.215256}

function initialize() {
    getRelevantGoogleReviews();
}
  
window.getRelevantGoogleReviews = function() {
    var service = new google.maps.places.PlacesService($('#service-helper').get(0));
    var concert = new google.maps.LatLng(savedConcert.lat, savedConcert.lng);
    var request = {
    location: concert,
    radius: '500',
    type: ['restaurant']
    };
    service.nearbySearch(request, callback);
}
  
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var restaurantName = results[i].name
            var restaurantAddress  = results[i].vicinity
            var restaurantRating  = results[i].rating
            var lat = results[i].geometry.location.lat();
            var lng = results[i].geometry.location.lng();

            restaurantResultList[i] = {
                name: restaurantName,
                address: restaurantAddress,
                rating: restaurantRating,
                lat: lat,
                lng: lng,
            }
            
            localStorage.setItem("restaurantResultList", JSON.stringify(restaurantResultList));

            var restaurantDiv = $("<div>");
            var restaurantNameDiv = $("<div>").text(restaurantName).addClass("restaurantName")
            var restaurantAddressDiv  = $("<div>").text("Address: "+restaurantAddress).addClass("restaurantAddress")
            var restaurantRatingDiv  = $("<div>").text("Rating: " +restaurantRating).addClass("restaurantRating")

            restaurantDiv.append(restaurantNameDiv)
            restaurantDiv.append(restaurantAddressDiv)
            restaurantDiv.append(restaurantRatingDiv)
            restaurantDiv.append("<br>")
            $("#restaurantList").append(restaurantDiv)
        }
    }

    initMap();

}

// //NO INFO BOX
// function initMap() {
//   // The location of concert
//   var concert = {lat: -33.8665433, lng: 151.1956316};
//   // The map, centered at concert
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 15 , center: concert});
//   // The marker, positioned at concert

//     var marker1 = new google.maps.Marker({position: concert, map: map, title: 'concert location'
//         });
// }


function initMap() {

    //TRYING TO add more markers!
    var savedRest = localStorage.getItem("restaurantResultList");
    savedRest = JSON.parse(savedRest);

    // console.log(savedRest)
    // console.log(savedRest[2].lat)

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(savedConcert.lat, savedConcert.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    var infowindow = new google.maps.InfoWindow();

    var marker, i;



    for (i = 0; i < savedRest.length; i++) { 
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(savedRest[i].lat, savedRest[i].lng),
            map: map
        });

        //console.log(savedRest[i].lat)

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(savedRest[i].name);
            infowindow.open(map, marker);
            }
        })(marker, i));
    }

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(savedConcert.lat, savedConcert.lng),
        map: map,
        icon: "../assets/images/birdpairs.png"
        //icon: "https://clipart.info/images/ccovers/1495916677round-star-png-image-yellow.png",
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
        infowindow.setContent(savedConcert.name);
        infowindow.open(map, marker);
        }
    })(marker, i));

  }
