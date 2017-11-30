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