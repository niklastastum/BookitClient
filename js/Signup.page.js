
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

        SDK.User.create(user, function (err, data) {
            if(err) {
                alert("Går det galt her?");
                throw err;
            }
        })


    });
});