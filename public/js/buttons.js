
// popovers
$('#filter-popover').popover({
    animation: true,
    content: $("#popover-content").html(),
    html: true
}).on('click', function () {
    $(".btn-info").click(function(){
        deleteMarkers();
        let targetlocation = myLocation.getPosition();
        $.getJSON( 'api/search', {
            latitude: targetlocation.lat,
            longitude: targetlocation.lng,
            radius: $("#radius").val(),
            workload: $("#workload").val(),
            day: $("#day").val(),
            hour: $("#hour").val(),
        }) .done(function( data ) {
            console.log(data);
            processSearch(data);

        });
        $('#filter-popover').popover('hide');

        let placesPanel = document.getElementById('right-panel');
        placesPanel.style.visibility="visible";

    });
});

let datetime = new Date();
console.log('set date=' + datetime.getDay());
$("#day").val(datetime.getDay());

//search all restaurants near this location



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