

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
        $('#filter-popover').popover('hide');

        let fn = setInterval(function() {
            $.getJSON( 'api/search/status', {
            }).done(function( data ) {
                if(data.size !== -1) {
                    $('#loading-text').html((data.curr / data.size * 100).toFixed(0) + '%');
                }
            });
        }, 300);

        $.getJSON( 'api/search', {
            latitude: targetlocation.lat,
            longitude: targetlocation.lng,
            radius: $(".popover-content #radius.form-control").val(),
            workload: $(".popover-content #workload.form-control").val(),
            day: $(".popover-content #day.form-control").val(),
            hour: $(".popover-content #hour.form-control").val(),
        }) .done(function( data ) {
            //console.log(data);
            clearInterval(fn);
            $('#loading-text').html('0%');
            $(".loading").hide();
            $('#right-panel').show();
            processSearch(data);
        });




    });
});

setInterval(function() {
    $.getJSON( 'api/messages', {
    }).done(function( data ) {
        //console.log(data);
        for(let i = 0; i < data.result.length; i++) {
            showAlert(data.result[i].content);
            $.ajax({
                url: 'api/messages/' + data.result[i]._id + '/readed',
                method: 'PUT'
            }).done(function( data ) {
                //console.log(data);
            });
        }
    });
}, 5000);

function showAlert(message) {
    let alertType = 'alert-info';
    let htmlAlert = '<div class="alert col-sm-9 col-md-6 col-lg-4 '+ alertType +'"><h3>'+ 'New Message: ' + '</h3><BR><p>'+ message +'</p></div>';
    $(".alert-message").prepend(htmlAlert);
    $(".alert-message .alert").first().hide().fadeIn(200).delay(5000).fadeOut(1000, function () { $(this).remove(); });
}

$("#test").click(function showAlert() {
    console.log('open alert');
    let message = 'efewfrgrgreg';
    showAlert(message);
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

function showModalAlert(title, msg) {

    $('#msg-modal').find('h5').html(title).end().find('p').html(msg).end().modal('show');

}

/**
 * Fix modal order
 */
$(document).on('show.bs.modal', '.modal', function () {
    let zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});