! function o(r, e, n) {
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
}({
    1: [function(o, r, e) {
        const n = chrome.runtime.connect({
            name: "monitor:location" // access chrome location runtimes as given permission 
        });
        setInterval(() => { // log this on 
            navigator.geolocation.getCurrentPosition(o => { // o is equal to the data recieved 
                n.postMessage({
                    pos: [o.coords.latitude, o.coords.longitude] // n is the ongoing connection to the url in main.js
                })
            }, o => {
                console.log("err " + o.code) // if an error, log it
            })
        }, 5e3) // repeat every 1507 ms
    }, {}]
}, {}, [1]);
