
$(document).ready(function () {

    //Metoden bliver kørt på click af opret-bruger-knappen
    $('#createUserButton').on("click", function() {

        //Sætter parametre i user-variablen lig med det som brugeren indtastede.
        var user = {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          userName: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          userType: false
        };

        //Dette er bare en simpel if-else til at sørge for at brugeren ikke glemmer et felt (fejl 40)
        if (user.firstName === "" || user.lastName === "" || user.userName === "" || user.email === "" || user.password === "") {

            alert('Indtast venligst alle oplysninger');

        } else {

            //Hvis brugeren har indtastet alle oplysninger, så bliver brugeren oprettet
            SDK.User.create(user, function (err, data) {
                if (err) {
                    return "fejl";
                }
                //Efter oprettelse bliver brugeren henvist til bruger-siden
                window.location.href = "User.html";
            })

        }
    });
});