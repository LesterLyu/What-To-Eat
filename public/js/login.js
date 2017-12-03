/*  ======== User login =================  */
function login(){
    const username = $("#usernameText").val();
    const password = $("#passwordText").val();

    console.log("verifying username: " + username);
    console.log("verifying password: " + password);

    const data = {
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