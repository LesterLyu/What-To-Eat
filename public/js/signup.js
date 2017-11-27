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
        url:"/api/register",
        type:"POST",
        dataType:"text",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function(response){

            // alert(response);
            // if (response == "wrongPwd"){
            //     alert("Wrong Password: Please Re-Enter");
            // } else if (response == "invalidEmail"){
            //     alert("Invalid Email: Permission Denied");
            //
            // } else {
            //     console.log(response);
            //     window.location='/main';
            //     $("html").html(response);
            // }
            window.location='/';
            $("html").html(response);
        }, error: function (xhr){
            alert(xhr.responseText);
        }
    });
}