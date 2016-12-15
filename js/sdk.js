/**
 * Created by Tastum on 10/11/2016.
 */
var SDK = {

    //serverens adresse
    serverURL: "http://localhost:8080/api",

    request: function (options, cb) {

        //Ajax kald, der sætter parametrene for kommunikationen med serveren
        $.ajax({
            url: SDK.serverURL + options.url,
            headers: {
               "authorization":sessionStorage.getItem("token")
            },
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    Book: {
        //Henter alle bøger
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/book"}, cb);
        }
    },

    User: {
        //Opretter bruger
        create: function (data, cb) {
            // var data = encryptDecrypt(data);
            // SDK.request({method: "POST", url: "/user", data: data}, cb);
            SDK.request({method: "POST", url: "/user", data: data}, cb);
        },
        //Sætter aktuel bruger ved at gøre brug af user-objectet i sessionStorage
        current: function () {
            var currentUser = JSON.parse(sessionStorage.getItem("user"));
            return currentUser;
        },
        //PUT metode, der køres ved ændring af bruger.
        edit: function (data, cb) {
            var userID = JSON.parse(sessionStorage.getItem("user")).userID;
            SDK.request({method: "PUT", url: "/user/" + userID, data: data}, cb);
        },
        //Sletter brugeren
        delete: function (cb) {
            var userID = JSON.parse(sessionStorage.getItem("user")).userID;
            SDK.request({method: "DELETE", url: "/user/" + userID}, cb);

            //Sørger for at fjerne Token og bruger-objectet (og hermed også currentUser) fra sessionStorage
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
        }
    },

    Curriculum: {
        //Henter alle pensumlister
        getAll: function (cb){
            SDK.request({method: "GET", url: "/curriculum"}, cb);
        },
        //Henter bøgerne til en bestemt pensumliste på baggrund af brugerens valg.
        //Dette gøres ved brug af valgt curriculumID i adressen.
        getCurriculumBooks: function(curriculumID, cb) {
            SDK.request({method: "GET", url: "/curriculum/"+curriculumID+"/books"},cb);
        }
    },

    //Log-ud metode, der bliver kørt ved tryk på logud knappen
    //Denne metode sender token med, da den skal slettes fra databasen
    logOut: function (data, cb) {
        var token = {
            token: sessionStorage.getItem("token")
        };
        SDK.request({method: "POST", url: "/user/logout", data: token}, cb);

        //Fjerner token og user objekt fra sessionStorage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    },

    //Login metode, der modtager et username og password
    login: function (username, password, cb) {
        this.request({
            data: {
                username: username,
                password: password
            },
            url: "/user/login",
            method: "POST"
        }, function (err, data) {

            //On login-error
            if (err) return cb(err);

            //Her sættes token og user objekt i sessionStorage
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            cb(null, data);

        });
    },

};

//Krypterings- og dekrypteringsmetoden. Samme version som på serveren, men skrevet i JavaScript.
function encryptDecrypt(input) {
    var key = ['T', 'C', 'P'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}

//Denne metode bliver kørt ved click på logud-knap og ligger i SDK, da den bliver brugt af samtlige sider.s
$("#logoutClick").on("click", function () {
    if (err) throw err;
            SDK.logOut();
            window.location.href = "Login.html";
});
