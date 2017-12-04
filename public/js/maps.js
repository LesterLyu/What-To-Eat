var googleMapGeoKey = "AIzaSyBGAbwJuGZCiwLSKCi_8d-iee5fJAd8AYM";
var myLocation;
var markers = [];
var service;
var current_map;
var infowindow;
let places = [];


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

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
        console.log("supports location");
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            loadMap(location);

        }, showError, options);
    } else {
        alert("Geolocation is not supported by this browser or OS.");
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
        center: location,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
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
    console.log('Location error');
    console.log(error);
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

function processSearch(data) {
    for (let i = 0; i < data.result.length; i++) {
        createMarker2(data.result[i]);
    }
    places = data.result;
    createLists(data.result);
}

function createMarker2(place) {
    var marker = new google.maps.Marker({
        map: current_map,
        position: {
            lat: place.coordinates.latitude,
            lng: place.coordinates.longitude,
        }
    });
    marker.set("place_id", place.id);
    marker.set("place_name", place.name);
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(current_map, this);
    });
}


function createLists(places){
    let placesList = $('#places');
    placesList.html('');
    for (let i = 0; i < places.length; i++) {
        let place = places[i];
        let newli = createListItem(place);
        placesList.append(newli);
    }
}


function createListItem(place){
    let newli = $('<a class="list-group-item" href="#" id="placeChild"> </a>');
    newli.attr("onclick","placeDetail(\""+place.id+"\");");

    let imgdiv = $('<div class="media col-3"></div>');
    let imgfig = $('<figure class="pull-left" id="icon"> </figure>');

    let img = $('<img id="image" src="'+ place.image_url +'"/>');

    imgfig.append(img);
    imgdiv.append(imgfig);
    newli.append(imgdiv);
    let info = $('<div class="col-9"></div>');
    let name = $('<h6 class="list-group-item-heading">' + place.name + '</h6>');

    info.append(name);
    let addr = $('<p class="list-group-item-text">' + place.address[0] + '</p>');


    info.append($('<img id="rating-image" src="/yelp_stars/web_and_ios/extra_large/extra_large_'+ place.rating +'.png"/>').get());
    info.append(addr);
    if(place.popularity[0] === 'None')
        place.popularity[0] = '0 min';
    info.append($('<p class="list-group-item-text">' + place.price + '\t&nbsp;wait time: ' + place.popularity[0] + '</p>'));
    newli.append(info);
    return newli;
}


function centerMarker(marker){
    current_map.setCenter(marker.getPosition());
    infowindow.setContent(marker.get("place_name"));
    infowindow.open(current_map, marker);
}


function placeDetail(placeId){
    for (var i = 0; i < markers.length; i++) {
        //console.log(markers[i].get("place_id") + "=?" + placeId);
        if(markers[i].get("place_id") == placeId){
            centerMarker(markers[i]);
            popupDetail(placeId);
        }
    }

}

function popupDetail(placeId){
    let place;
    for(let i = 0; i < places.length; i++) {
        if(places[i].id === placeId)
            place = places[i];
    }
    closePanel();
    console.log('open');
    document.getElementById('info-name').innerHTML = place.name;
    document.getElementById('info-address').innerHTML = place.address[0];
    document.getElementById('info-pic').setAttribute("src",place.image_url);
    document.getElementById('info-phone').innerHTML = "Phone:" + place.phone;
    document.getElementById('info-website').setAttribute("onclick"," window.open(\""+place.url+"\");");
    $('#right-information').fadeIn('fast');
}


function closePanel(){
    $("#right-panel").fadeOut( "fast");
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
