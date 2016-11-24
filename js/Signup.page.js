
$(document).ready(function () {

    $('#createUserButton').on("click", function() {

        var user = {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          userName: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          userType: true
        };

        // if (user.firstName === null || user.lastName === null || user.userName === null) {
        if (user.firstName === "" || user.lastName === "" || user.userName === "" || user.email === "" || user.password === "") {

            alert('Indtast venligst alle oplysninger');

        } else {

            SDK.User.create(user, function (err, data) {
                if (err) {
                    alert("Går det galt her?");
                    throw err;
                }
            })

        }
    });
});