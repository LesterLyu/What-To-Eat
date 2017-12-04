
// popovers
$('#filter-popover').popover({
    animation: true,
    content: $("#popover-content").html(),
    html: true
}).on('click', function () {
    let datetime = new Date();
    $(".popover-content #day").val(datetime.getDay());
    $(".popover-content #hour").val(datetime.getHours());
    $('.popover-content #checkbox-now').on('click', function(){
        console.log('now');
        const checkbox = $(this);
        if (checkbox.is(':checked'))  {
            $('.popover-content #hide-on-now').slideUp();
        }
        else {
            $('.popover-content #hide-on-now').slideDown();
        }
    });

    $("#search.btn.btn-info").click(function(){
        $(".loading").show();
        $('#loading-text').html('0%');
        deleteMarkers();
        let targetlocation = myLocation.getPosition();
        $("#right-panel").fadeOut( "fast");
        $("#right-information").fadeOut( "fast");
        $('#filter-popover').popover('hide');
        let fn = setInterval(function() {
            $.getJSON( 'api/search/status', {
            }).done(function( data ) {
                if(data.size !== 0) {
                    $('#loading-text').html((data.curr / data.size * 100).toFixed(0) + '%');
                }
            });
        }, 300);
        // now
        let day = -1, hour = -1;
        if(!$('.popover-content #checkbox-now').is(':checked')) {
            day = $(".popover-content #day.form-control").val();
            hour = $(".popover-content #hour.form-control").val();
        }

        $.getJSON( 'api/search', {
            latitude: targetlocation.lat,
            longitude: targetlocation.lng,
            radius: $(".popover-content #radius.form-control").val(),
            workload: $(".popover-content #workload.form-control").val(),
            day: day,
            hour: hour,
            price: $(".popover-content #price.form-control").val(),
        }) .done(function( data ) {
            //console.log(data);
            clearInterval(fn);
            $("#show-hide-button").fadeIn( "fast");
            $(".loading").fadeOut( "fast");
            $("#right-panel").fadeIn( "fast");
            processSearch(data);
        });

    });
});
let lastScreen = '';

function hide() {
    const button = $('#show-hide-button');
    const rightPanel = $('#right-panel');
    const rightInfo = $('#right-information');
    if(rightPanel.is(":visible")) {
        button.html('SHOW');
        lastScreen = 'panel';
        rightPanel.fadeOut('fast');
    }
    else if(rightInfo.is(":visible")) {
        button.html('SHOW');
        lastScreen = 'info';
        rightInfo.fadeOut('fast');
    }
    else if(lastScreen === 'panel'){
        button.html('HIDE');
        rightPanel.fadeIn('fast');
    }
    else if(lastScreen === 'info'){
        button.html('HIDE');
        rightInfo.fadeIn('fast');
    }
}

function logout() {
    $.ajax({
        url: 'api/logout',
        method: 'POST'
    }).done(function( data ) {
        // cannot fail
        location.reload();
    });
}

function updateMessages() {
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
}
if($('#status').html() !== 'LOGIN') {
    setInterval(updateMessages, 3000);
}


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






$("#close").click(function(){
    $("#right-panel").fadeOut( "fast");

});

$("#info-close").click(function(){
    // var placesPanel = document.getElementById('right-information');
    // placesPanel.style.visibility="hidden";
    // var placesPanel = document.getElementById('right-panel');
    // placesPanel.style.visibility="visible";
    $("#right-information").fadeOut( "fast");
    $("#right-panel").fadeIn( "fast");
});

function showModalAlert(title, msg) {
    $('#msg-modal').find('h5').html(title).end().find('p').html(msg).end().modal('show');

}

function showModalConfirm(title, msg, callback) {
    $('#confirm-button').attr('onclick', callback + '()');
    $('#confirm-modal').find('h5').html(title).end().find('p').html(msg).end().modal('show');
}

function showMessageList() {
    getMessageHtml(function (html) {
        $('#msg-list-body').html(html);
        $('#msg-list-modal').modal('show');
    });
}

function getMessageHtml(callback) {
    let htmlData = '<ul class="list-group">';
    $.getJSON( 'api/messages/all', {
    }).done(function( data ) {
        console.log(data);
        if(data.success) {
            for(let i = 0; i < data.result.length; i++) {
                htmlData += '<li class="list-group-item row">\n' +
                    '<div class="col-sm-1 d-none d-sm-block"> ' +
                    '<i style="display: inline-flex;vertical-align: middle;" class="material-icons">' +
                    'mail_outline</i></div>' +
                    '<div class="col-10">' +
                    '<p class="word-wrap">' + data.result[i].content +
                    '</p></div>\n' +
                    '<a href="#" class="col-xs-1">' +
                    '   <i style="display: inline-flex;vertical-align: middle;" onclick="deleteMessage(\'' +
                    data.result[i].msgid + '\')" class="nounderline material-icons">delete</i>' +
                    '   </a>\n' +
                    '</li>\n';
            }
            htmlData += '</ul>';
            callback(htmlData);
            $('#msg-list-body').html(htmlData);
        }
        else {
            showModalAlert('Error', data.msg);
        }
    });
}

function deleteMessage(msgid) {
    $.ajax({
        url: 'api/messages/user/' + msgid,
        method: 'DELETE'
    }).done(function( data ) {
        if(!data.success) {
            showModalAlert('Error', 'Cannot delete message.');
        }
        else {
            getMessageHtml(function (html) {
                $('#msg-list-body').html(html);
            });
        }
    });
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