/**
 * Created by Tastum on 06/11/2016.
 */
$(document).ready(function() {

    var currentUser = SDK.User.current();

    var $oldFirstname = $('#oldFirstname');
    var $oldLastname = $('#oldLastname');
    var $oldUsername = $('#oldUsername');
    var $oldEmail = $('#oldEmail');
    // var $oldPassword = $('#oldPassword');

    $oldFirstname.prepend("<p><i>Tidligere: </i>" + currentUser.firstName + "</p>");
    $oldLastname.prepend("<p><i>Tidligere: </i>" + currentUser.lastName + "</p>");
    $oldUsername.prepend("<p><i>Tidligere: </i>" + currentUser.userName + "</p>");
    $oldEmail.prepend("<p><i>Tidligere: </i>" + currentUser.email + "</p>");
    // $oldPassword.prepend("<p><i>Tidligere: </i>" + currentUser.password + "</p>");

    $('#editUserButton').on("click", function() {

        var user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            userName: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        };

        SDK.User.edit(user, function () {
            if (err) {
                throw err;
            }
        })

    });

});
