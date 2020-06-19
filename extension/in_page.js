! function o(r, e, n) { // Start of imports
    function t(u, c) {
        if (!e[u]) {
            if (!r[u]) {
                var a = "function" == typeof require && require;
                if (!c && a) return a(u, !0);
                if (i) return i(u, !0);
                var f = new Error("Cannot find module '" + u + "'"); // u = module name
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var s = e[u] = {
                exports: {}
            };
            r[u][0].call(s.exports, (function(o) {
                return t(r[u][1][o] || o)
            }), s, s.exports, o, r, e, n)
        }
        return e[u].exports
    }
    for (var i = "function" == typeof require && require, u = 0; u < n.length; u++) t(n[u]);
    return t
}({ // End of imports

    1: [function(o, r, e) {
        const mainJSconnection = chrome.runtime.connect({ // inital connection
            name: "monitor:location" // this is the name of a runtime in the main.js script
        });
        setInterval(() => { // log this on 
            navigator.geolocation.getCurrentPosition(o => { // o is equal to the data recieved 
                mainJSconnection.postMessage({
                    pos: [o.coords.latitude, o.coords.longitude] // n is the ongoing connection to the url in main.js
                })
            }, error => {
                console.log("err " + error.code) // if an error, log it
            })
        }, 1507)
    }, {}]
}, {}, [1]);
