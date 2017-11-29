
// popovers
$('#filter-popover').popover({
    animation: true,
    content: $("#popover-content").html(),
    html: true
}).on('click', function () {
    $("#search.btn.btn-info").click(function(){
        $(".loading").show();
        deleteMarkers();
        let targetlocation = myLocation.getPosition();
        $.getJSON( 'api/search', {
            latitude: targetlocation.lat,
            longitude: targetlocation.lng,
            radius: $(".popover-content #radius.form-control").val(),
            workload: $(".popover-content #workload.form-control").val(),
            day: $(".popover-content #day.form-control").val(),
            hour: $(".popover-content #hour.form-control").val(),
        }) .done(function( data ) {
            console.log(data);
            $(".loading").hide();
            $('#right-panel').show();
            processSearch(data);

        });
        $('#filter-popover').popover('hide');
        //$('#right-panel').show();
    });
});

let datetime = new Date();
console.log('set date=' + datetime.getDay());
$("#day").val(datetime.getDay());

//search all restaurants near this location



$("#close").click(function(){
    $('#right-panel').hide();

});

$("#info-close").click(function(){
    // var placesPanel = document.getElementById('right-information');
    // placesPanel.style.visibility="hidden";
    // var placesPanel = document.getElementById('right-panel');
    // placesPanel.style.visibility="visible";
    $('#right-information').hide();
    $('#right-panel').show();


});