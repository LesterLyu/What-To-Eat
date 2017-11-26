var googleMapGeoKey = "AIzaSyBGAbwJuGZCiwLSKCi_8d-iee5fJAd8AYM";
var myLocation;
var markers = [];
var service;
var current_map;
var infowindow;


/**
 * Get estimated location.
 * @param callback
 */
function get_estimated_location(callback) {
    $.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleMapGeoKey, function( data ) {
        callback(data);
    });
}

/**
 * Google js will call this function when loaded.
 */
function initMap() {
    console.log("init map");

    if (navigator.geolocation) {
        console.log("supports location");
        navigator.geolocation.getCurrentPosition(function(position){
            console.log("??");
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            loadMap(location);

        }, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/**
 * init #map element and set center to 'location'
 * set up Google Places library
 * @param location
 */
function loadMap(location) {
    current_map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    service = new google.maps.places.PlacesService(current_map);
    infowindow = new google.maps.InfoWindow();
    addClickMarker(location);

    current_map.addListener('click', function(event,map) {
        //deleteMarkers();
        addClickMarker(event.latLng);
    });
}

/**
 * After request the location service on browser, errors may occur.
 * @param error
 */
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
    get_estimated_location(function(data){
        loadMap(data.location);
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// add marker
function addClickMarker(location) {
    console.log("clicked");
    var image = 'img/search-nearby.png';
    if(myLocation)
        myLocation.setMap(null);
    myLocation = new google.maps.Marker({
        position: location,
        map: current_map,
        icon:image
    });

}

// clear markers
function clearMarkers() {
    setMapOnAll(null);
}

// delete markers
function deleteMarkers() {
    clearMarkers();
    markers = [];
}




function callback(results, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
        createLists(results);
    }
}

function createLists(places){
    var placesList = document.getElementById('places');
    placesList.innerHTML = '';
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var newli = createListItem(place);
        placesList.appendChild(newli);
    
    }
}


function createListItem(place){
    var newli = document.createElement("div");
    newli.setAttribute("id", "placeChild"); // added line

    var img = document.createElement('img');
    img.setAttribute("id", "icon");
    img.src = place.icon;
    newli.appendChild(img);

    var name = document.createElement('h6');
    name.setAttribute("id", "name");
    name.innerHTML = place.name;
    newli.appendChild(name);

    var rat = document.createElement('p');
    rat.setAttribute("id", "rating");
    rat.innerHTML = "Rating:" + place.rating;
    newli.appendChild(rat);

    var vin = document.createElement('p');
    vin.setAttribute("id", "vicinity");
    vin.innerHTML = "Address:" + place.vicinity;
    newli.appendChild(vin);
    newli.setAttribute("class","list-group-item")
    newli.setAttribute("onclick","placeDetail(\""+place.place_id+"\");");
    return newli;
}


function centerMarker(marker){
    current_map.setCenter(marker.getPosition());
    infowindow.setContent(marker.get("place_name"));
    infowindow.open(current_map, marker);
}


function placeDetail(placeId){
    for (var i = 0; i < markers.length; i++) {
        console.log(markers[i].get("place_id"));
        if(markers[i].get("place_id") == placeId){
            centerMarker(markers[i]);
        }
    }



    service.getDetails({
        placeId: placeId
        }, popupDetail);
}

function popupDetail(place,status){
        closePanel()
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            document.getElementById('info-name').innerHTML = place.name;
            document.getElementById('info-address').innerHTML = place.formatted_address;
            var photourl = place.photos[0].getUrl({'maxWidth':500, 'maxHeight': 500});
            document.getElementById('info-pic').setAttribute("src",photourl);
            document.getElementById('info-phone').innerHTML = "Phone:" + place.formatted_phone_number;
            document.getElementById('info-website').setAttribute("onclick"," window.open(\""+place.website+"\");");

            if(place.opening_hours == null){
                document.getElementById('info-opening').setAttribute("class","btn btn-outline-secondary");            
                document.getElementById('info-opening').innerHTML = "NO HOURS";
            }else if(place.opening_hours.open_now){
                document.getElementById('info-opening').innerHTML = "OPENING";
                document.getElementById('info-opening').setAttribute("class","btn btn-outline-success");
            }else{
                document.getElementById('info-opening').setAttribute("class","btn btn-outline-danger");            
                document.getElementById('info-opening').innerHTML = "CLOSED";
            }


            document.getElementById('right-information').style.visibility = "visible";




        }
    }


function closePanel(){
    var placesPanel = document.getElementById('right-panel');
    placesPanel.style.visibility="hidden";
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: current_map,
        position: place.geometry.location
    });
    marker.set("place_id", place.place_id);
    marker.set("place_name", place.name);
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(current_map, this);
    });
}