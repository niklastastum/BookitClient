/**
 * Created by Tastum on 06/11/2016.
 */
$(document).ready(function () {

    $("#LoginButton").on("click", function (e) {
        e.preventDefault();

        var un = $("#inputUsername").val();
        var pw = $("#inputPassword").val();

        // var currentUser = SDK.User.current();
        // var currentUser = localStorage.getItem("user");
        var currentUser = JSON.parse(sessionStorage.getItem("user"));

        SDK.login(un, pw, function (err, data) {

            //On wrong Credentials
            if (err) {
                return "fejl";
            }

            //Login OK!
            alert(currentUser.firstName);
            window.location.href = "User.html";

        });

    });

});