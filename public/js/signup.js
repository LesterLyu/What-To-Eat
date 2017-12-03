/*  ======== User login =================  */
function signUp(){
    const email = $("#emailText").val();
    const username = $("#usernameText").val();
    const password = $("#passwordText").val();
    const admin = false;

    const data = {
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