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
    var placesList = document.getElementById('places');
    //placesList.innerHTML = '';
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var newli = createListItem(place);
        placesList.appendChild(newli);

    }
}


function createListItem(place){
    var newli = document.createElement("a");
    newli.setAttribute("class","list-group-item");
    newli.setAttribute("href","#");
    newli.setAttribute("id", "placeChild"); // added line

    var imgdiv = document.createElement('div');
    imgdiv.setAttribute("class", "media col-md-3");
    var imgfig = document.createElement('figure');
    imgfig.setAttribute("class", "pull-left");
    imgfig.setAttribute("id", "icon");
    var img = document.createElement('img');
    img.setAttribute("id", "image");
    img.src = place.image_url;
    imgfig.appendChild(img);
    imgdiv.appendChild(imgfig);
    newli.appendChild(imgdiv);

    var info = document.createElement('div');
    info.setAttribute("class","col-md-6");

    var name = document.createElement('h6');
    //name.setAttribute("id", "name");
    name.setAttribute("class","list-group-item-heading");
    name.innerHTML = place.name;
    info.appendChild(name);

    var vin = document.createElement('p');
    vin.setAttribute("class","list-group-item-text");
    //vin.setAttribute("id", "vicinity");
    vin.innerHTML = place.address[0];
    info.appendChild(vin);
    newli.append(info);
    var ratdiv = document.createElement('div');
    ratdiv.setAttribute('class',"col-md-3 text-center");
    var rat = document.createElement('well');
    rat.setAttribute('class',"stars");


    var i;
    var star;
    for(i = 0; i < place.rating; i++){
        star = document.createElement('span');
        star.setAttribute('class',"fa fa-star checked");
        star.setAttribute("id", "rating");
        rat.appendChild(star)
    }
    for(i = place.rating; i < 5; i++){
        star = document.createElement('span');
        star.setAttribute('class',"fa fa-star");
        star.setAttribute("id", "rating");
        rat.appendChild(star)
    }
    ratdiv.appendChild(rat);
    newli.appendChild(ratdiv);

    //newli.setAttribute("onclick","placeDetail(\""+place+"\");");
    newli.setAttribute("onclick","placeDetail(\""+place.id+"\");");
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

    // if(place.opening_hours == null){
    //     document.getElementById('info-opening').setAttribute("class","btn btn-outline-secondary");
    //     document.getElementById('info-opening').innerHTML = "NO HOURS";
    // }else if(place.opening_hours.open_now){
    //     document.getElementById('info-opening').innerHTML = "OPENING";
    //     document.getElementById('info-opening').setAttribute("class","btn btn-outline-success");
    // }else{
    //     document.getElementById('info-opening').setAttribute("class","btn btn-outline-danger");
    //     document.getElementById('info-opening').innerHTML = "CLOSED";
    // }


    $('#right-information').show();




}


function closePanel(){
    $('#right-panel').hide();
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
