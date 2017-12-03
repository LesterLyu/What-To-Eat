function edit(){
    var username = $("#usernameText").val();
    console.log("Edited username is: "+username);

    var data = {
        "username": username
    };
    $.ajax({
        url: "/api/user",
        method: "PUT",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
    }).done(function (data) {
        if(data.success) {
            location.reload();
        }
    }).fail(function(xhr, status, error) {
        showModalAlert('Modify profile' ,xhr.responseJSON.msg);
    });
}

function deleteAccount() {
    let username = $("#usernameText").val();
    showModalConfirm('Are you sure?', 'Your Account will no longer usable!', 'deleteCallback');

}


function deleteCallback() {
    $('#confirm-modal').modal('hide');
    $.ajax({
        url: "/api/user",
        method: "DELETE",
        contentType:"application/json; charset=utf-8",
    }).done(function (data) {
        if(data.success) {
            location.reload();
        }
    }).fail(function(xhr, status, error) {
        showModalAlert('Delete account' ,xhr.responseJSON.msg);
    });
}