
$(document).ready(function () {

    $('#createUserButton').on("click", function() {

        var user = {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          userName: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          userType: false
        };

        if (user.firstName === "" || user.lastName === "" || user.userName === "" || user.email === "" || user.password === "") {

            alert('Indtast venligst alle oplysninger');

        } else {

            SDK.User.create(user, function (err, data) {
                if (err) {
                    return "fejl";
                }
                window.location.href = "User.html";
            })

        }
    });
});