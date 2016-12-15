/**
 * Created by Tastum on 06/11/2016.
 */
$(document).ready(function() {

    //Sætter current user, så oplysninger på brugeren kan vises
    var currentUser = SDK.User.current();

    var $oldFirstname = $('#oldFirstname');
    var $oldLastname = $('#oldLastname');
    var $oldUsername = $('#oldUsername');
    var $oldEmail = $('#oldEmail');

    //Viser nuværende oplysninger
    $oldFirstname.prepend("<p><i>Tidligere: </i>" + currentUser.firstName + "</p>");
    $oldLastname.prepend("<p><i>Tidligere: </i>" + currentUser.lastName + "</p>");
    $oldUsername.prepend("<p><i>Tidligere: </i>" + currentUser.userName + "</p>");
    $oldEmail.prepend("<p><i>Tidligere: </i>" + currentUser.email + "</p>");

    //Metoden til at ændre brugeren, der bliver kørt på klik af knappen
    $('#editUserButton').on("click", function() {

        //Sætter de ændrede værdier i et user objekt.
        var user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            userName: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        };

        SDK.User.edit(user, function () {
            alert("Din bruger blev ændret");
        })

    });

    //Metoden til at slette brugeren, der bliver kørt på klik af slet-knappen
    $('#deleteUserButton').on("click", function(event) {
        event.preventDefault();

        //Et popup-vindue, der sørger for at brugeren er sikker på at slette sin bruger
        var userDelete = window.confirm("Vil du slette din bruger?");

        //Hvis brugeren trykker "ok"
        if (userDelete) {
            SDK.User.delete(function() {
                //Hvis brugeren bliver slettet, så redirectes personen til startsiden.
                window.location.href = "Login.html";
                alert("din bruger blev slettet");
            });
            //Hvis brugeren trykker "cancel"
        } else {
         console.log("User not deleted.");
        }

    });

});
