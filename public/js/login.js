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
        url:'/api/authenticate',
        type:"POST",
        dataType:"text",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function(response){
            window.location='/';
            $("html").html(response);
        }, error: function (xhr){
            alert(xhr.responseText);
        }
    });
}