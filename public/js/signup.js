/*  ======== User login =================  */
function signUp(){
    var email = $("#emailText").val();
    var username = $("#usernameText").val();
    var password = $("#passwordText").val();
    var admin = "false";

    var data = {
        "email": email,
        "username": username,
        "password": password,
        "admin": admin
    };

    $.ajax({
        url: '/api/register',
        method: "POST",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
    }).done(function (response) {
        if(response.success) {
            window.location.href = '/';
        }
    }).fail(function(xhr, status, error) {
        console.log(xhr);
        showModalAlert('SignUp Error', xhr.responseJSON.msg);
    });
}


function showModalAlert(title, msg) {
    $('#msg-modal').find('h5').html(title).end().find('p').html(msg).end().modal('show');

}