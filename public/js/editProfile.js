function edit(){
    var username = $("#usernameText").val();
    console.log("Edited username is: "+username);

    var data = {
        "username": username
    };
    $.ajax({
        url: "/api/editprofile",
        method: "POST",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
    }).done(function (data) {
        if(data.success) {
            location.reload();
        }
        else {
            showModalAlert('Modify profile' ,data.msg);
        }
    });
}

function deleteAccount() {
    let username = $("#usernameText").val();
    showModalConfirm('Are you sure?', 'Your Account will no longer usable!', 'deleteCallback');

}


function deleteCallback() {
    $('#confirm-modal').modal('hide');
    $.ajax({
        url: "/api/delete",
        method: "DELETE",
        contentType:"application/json; charset=utf-8",
    }).done(function (data) {
        if(data.success) {
            location.reload();
        }
        else {
            showModalAlert('Delete account' ,data.msg);
        }
    });
}