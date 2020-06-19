// Start of imports

! function e(r, o, t) { // modules
    function n(a, c) { // a = name of module
        if (!o[a]) {
            if (!r[a]) {
                var s = "function" == typeof require && require;
                if (!c && s) return s(a, !0);
                if (i) return i(a, !0);
                var f = new Error("Cannot find module '" + a + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var u = o[a] = {
                exports: {}
            };
            r[a][0].call(u.exports, (function(e) {
                return n(r[a][1][e] || e)
            }), u, u.exports, e, r, o, t)
        }
        return o[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < t.length; a++) n(t[a]);
    return n
}({

// End of imports

    1: [function(e, r, o) {
        const t = 6e4,
            n = 750 / 111111,
            i = 12e5;
        let a = 0,
            c = [0, 0];
        const s = "https://devices.lsmdm.com/log/activity"; //  base url to connect to

        function newPromiseLoop(e) {
            return new Promise((r, o) => {
                setTimeout(r, e)
            })
        }
        async function u(e) {
            if (!Array.isArray(e)) return;
            if (!e[0]) return;
            if (!e[1]) return;
            var r, o, t;
            ((new Date).getTime() - a > i || !(Math.abs(c[0] - e[0]) < n && Math.abs(c[1] - e[1]) < n)) && (await (r = l, o = d, t = e, new Promise((e, n) => {
                try {
                    const i = new XMLHttpRequest, // initalize tracker :DDDD
                        a = "info[platform]=chromeTracker&info[email]=" + r + "&info[udid]=" + o + "&info[gps]=" + JSON.stringify(t) + "&info[phrases]=1";
                    i.open("POST", s, !0), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), i.send(a), i.onload = () => {
                        e()
                    }, i.onabort = () => {
                        n()
                    }, i.onerror = () => {
                        n()
                    }
                } catch (e) {
                    n(e)
                }
            })), a = (new Date).getTime()), c = e
        }
        let l, d;
        chrome.runtime.onConnect.addListener(runtime => {
            runtime.onMessage.addListener(async data => {
                Array.isArray(data.pos) ? await u(data.pos) : console.warn("Invalid coordinates")
            })
        }), async function() { // invade privacy to get email ;DDD
            for (;;) try { // very quick loop 
                l = await new Promise((e, r) => {
                    try {
                        chrome.identity.getProfileUserInfo(r => {
                            e(r.email)
                        })
                    } catch (e) {
                        r(e)
                    }
                }), d = "chrome:" + l;
                break
            } catch (e) {
                console.error("Error obtaining email: ", e), console.log("retrying email lookup in 1 second"), await newPromiseLoop(1e3)
            }
          // Get location and invade privacy
            for (;;) try { // very quick loop 
                const e = await new Promise((e, r) => {
                    try {
                      
                        navigator.geolocation.getCurrentPosition(data => { 
                            e([data.coords.latitude, data.coords.longitude])
                        }, e => {
                            r(e)
                        })
                    } catch (e) {
                        r(e)
                    }
                });
                await u(e), await newPromiseLoop(t)
            } catch (e) {
                console.error("Error processing location", e), console.log("Waiting 5 seconds before retrying location"), await newPromiseLoop(5000)
            }
        }()
    }, {}]
}, {}, [1]);
