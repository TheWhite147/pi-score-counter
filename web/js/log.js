if (typeof Log === "undefined") { Log = {}; }
if (typeof Log.LogPerf === "undefined") { Log.LogPerf = {}; }

(function () {

    Log.LogPerf = function(tag, time) {

        if (time >= 1000) {
            console.warn("PERF - " + tag + ": " + time + " ms");
        } else {
            console.log("PERF - " + tag + ": " + time + " ms");
        }
    }
    
})();