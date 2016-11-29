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
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                alert("Success on ajax");
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                alert("Error on ajax");
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
            SDK.request({method: "POST", url: "/user", data: data}, cb);
        },
        current: function () {
            // return SDK.Storage.load("user");
            return localStorage.getItem("user");
        }
    },

    Curriculum: {
        getOne: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/1/books"}, cb);
        },
        getTwo: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/2/books"}, cb);
        },
        getThree: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/3/books"}, cb);
        },
        getFour: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/4/books"}, cb);
        },
        getFive: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/5/books"}, cb);
        },
        getSix: function (cb) {
            SDK.request({method: "GET", url: "/curriculum/6/books"}, cb);
        }
    },

    logOut: function (data, cb) {

        var token = {
            token: localStorage.getItem("token")
        };
        SDK.request({method: "POST", url: "/user/logout", data: token}, cb);

        // SDK.Storage.remove("token");
        // SDK.Storage.remove("user");

        localStorage.removeItem("token");
        localStorage.removeItem("user")


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

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // SDK.Storage.persist("token", data.token);
            // SDK.Storage.persist("user", data.user);

            cb(null, data);

        });
    },

    // Storage: {
    //     prefix: "BookStoreSDK",
    //     persist: function (key, value) {
    //         window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    //     },
    //     load: function (key) {
    //         var val = window.localStorage.getItem(this.prefix + key);
    //         try {
    //             return JSON.parse(val);
    //         }
    //         catch (e) {
    //             return val;
    //         }
    //     },
    //     remove: function (key) {
    //         window.localStorage.removeItem(this.prefix + key);
    //     }
    // }

};

function encryptDecrypt(input) {
    var key = ['T', 'C', 'P'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}

$("#logoutClick").on("click", function() {
    SDK.logOut();
});
