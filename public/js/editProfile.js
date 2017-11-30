function edit(){
    var username = $("#usernameText").val();
    console.log("Edited username is: "+username);

    var data = {
      "username": username
    };
    $.ajax({
        url: "/api/editprofile",
        type: "POST",
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