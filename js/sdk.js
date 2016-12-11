/**
 * Created by Tastum on 10/11/2016.
 */
var SDK = {

    serverURL: "http://localhost:8080/api",

    request: function (options, cb) {

        // Take care of headers

        // var headers = {};
        // if (options.headers) {
        //     Object.keys(options.headers).forEach(function (h) {
        //         headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
        //     });
        // }

        // var headers = {
        //     'Access-Control-Allow-Origin' : 'http://localhost:8080/api/user',
        //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        //     // 'Content-Type': 'application/json',
        //     // 'Accept': 'application/json'
        // };


        // var s = ('{"firstName":"'+options.data.firstName+'","lastName":"'+options.data.lastName+'","userName":"'+options.data.userName+'","email":"'+options.data.email+'","password":"'+options.data.password+'","userType":"1"}');
        //
        // //Perform XHR
        // $.ajax({
        //     url:"http://localhost:8080/api/user",
        //     method:"POST",
        //     dataType:"json",
        //     headers: headers,
        //     contentType:"application/json",
        //     data: s,
        //     success: function () {
        //         alert("SUCCESS!");
        //     },
        //     error:function (xhr, status, error) {
        //         console.log(xhr, status, error);
        //         alert();
        //     }
        //
        // });

        $.ajax({
            url: SDK.serverURL + options.url,
            headers: {
               "authorization":sessionStorage.getItem("token"),
            },
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                // alert("Success on ajax");
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                // alert("Error on ajax");
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    Book: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/book"}, cb);
        }
    },

    User: {
        create: function (data, cb) {
            var test = encryptDecrypt(data);
            // SDK.request({method: "POST", url: "/user", data: data}, cb);
            SDK.request({method: "POST", url: "/user", data: test}, cb);
        },
        current: function () {
            var currentUser = JSON.parse(sessionStorage.getItem("user"));
            return currentUser;
        },
        edit: function (data, cb) {

            var userID = JSON.parse(sessionStorage.getItem("user")).userID;

            SDK.request({method: "PUT", url: "/user/" + userID, data: data}, cb);
        },
        delete: function (cb) {
            var userID = JSON.parse(sessionStorage.getItem("user")).userID;
            SDK.request({method: "DELETE", url: "/user/" + userID}, cb);

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
        }
    },

    Curriculum: {
        getAll: function (cb){
            SDK.request({method: "GET", url: "/curriculum"}, cb);
        },
        getCurriculumBooks: function(curriculumID, cb) {
            SDK.request({method: "GET", url: "/curriculum/"+curriculumID+"/books"},cb);
        }
    },

    logOut: function (data, cb) {

        var token = {
            token: sessionStorage.getItem("token")
        };
        SDK.request({method: "POST", url: "/user/logout", data: token}, cb);

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    },

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

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            cb(null, data);

        });
    },

};

function encryptDecrypt(input) {
    var key = ['T', 'C', 'P'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}

$("#logoutClick").on("click", function () {
    if (err) throw err;
            SDK.logOut();
            window.location.href = "Login.html";
});
