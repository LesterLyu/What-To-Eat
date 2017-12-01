/*  ======== User login =================  */
function login(){
    var username = $("#usernameText").val();
    var password = $("#passwordText").val();

    console.log("verifying username: " + username);
    console.log("verifying password: " + password);

    var data = {
        "username": username,
        "password": password
    };

    $.ajax({
        url: '/api/authenticate',
        method: "POST",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
    }).done(function (response) {
        if(response.success) {
            window.location.href = '/';
        }
    }).fail(function(xhr, status, error) {
        showModalAlert('Login Error', xhr.responseJSON.msg);
    });
}

function showModalAlert(title, msg) {
    $('#msg-modal').find('h5').html(title).end().find('p').html(msg).end().modal('show');

}