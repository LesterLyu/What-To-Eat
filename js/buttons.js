

// popovers
var popupElement = "<div class=\"form-group\">\n" +
    "                    <label for=\"exampleInputEmail1\">How many time you have?</label>\n" +
    "                    <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"timeHelp\" placeholder=\"Enter time in minutes\">\n" +
    "                </div>" + "<div class=\"form-group\">\n" +
    "    <label for=\"exampleSelect1\">Acceptable Workload</label>\n" +
    "    <select class=\"form-control\" id=\"exampleSelect2\">\n" +
    "      <option>not busy</option>\n" +
    "      <option>not too busy</option>\n" +
    "      <option>a little busy</option>\n" +
    "      <option>as busy as it gets</option>\n" +
    "    </select>\n" +
    "  </div>";
$('#filter-popover').popover({
    animation: true,
    content: popupElement,
    html: true
});

//search all restaurants near this location
$("#search").click(function(){
    deleteMarkers();
    var targetlocation = myLocation.getPosition();
    //console.log(targetlocation);

    service.nearbySearch({
        location: targetlocation,
        radius: '1000',
        type: ['restaurant'],
        pagetoken:''
    }, callback);


    var placesPanel = document.getElementById('right-panel');
    placesPanel.style.visibility="visible";

});


$("#close").click(function(){
    var placesList = document.getElementById('places');
    placesList.innerHTML = '';
    var placesPanel = document.getElementById('right-panel');
    placesPanel.style.visibility="hidden";

});

$("#info-close").click(function(){
    var placesPanel = document.getElementById('right-information');
    placesPanel.style.visibility="hidden";
    var placesPanel = document.getElementById('right-panel');
    placesPanel.style.visibility="visible";


});