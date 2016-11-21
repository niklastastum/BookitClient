/**
 * Created by Tastum on 10/11/2016.
 */
var SDK = {

    serverURL: "http://localhost:8080/api",

    request: function (options, cb) {

        // Take care of headers

        var headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach(function (h) {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

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
                alert(errorThrown);
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
            alert(JSON.stringify(data));
        },
        current: function () {
            return SDK.Storage.load("user");
            alert(SDK.Storage.persist("tokenId", data.id));
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
        },
    },

    logOut: function () {
        SDK.Storage.remove("tokenId");
        SDK.Storage.remove("userId");
        SDK.Storage.remove("user");
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

            SDK.Storage.persist("tokenId", data.id);
            SDK.Storage.persist("userId", data.userId);
            SDK.Storage.persist("user", data.user);

            cb(null, data);

        });
    },

    Storage: {
        prefix: "BookStoreSDK",
        persist: function (key, value) {
            window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: function (key) {
            var val = window.localStorage.getItem(this.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: function (key) {
            window.localStorage.removeItem(this.prefix + key);
        }
    }

};

function encryptDecrypt(input) {
    var key = ['T', 'C', 'P'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}