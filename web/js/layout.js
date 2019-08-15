if (typeof Layout === "undefined") { Layout = {}; }

(function () {

    var SCREEN_MARGIN = 0;

    if (SCREEN_MARGIN > 0) {
        $("body").css("margin", SCREEN_MARGIN + "px");
        $("body").css("overflow", "hidden");
        $("#clock").css("right", SCREEN_MARGIN + "px");
        $("#clock").css("bottom", (SCREEN_MARGIN + 20) + "px");
        $("#banner-stats").css("bottom", SCREEN_MARGIN + "px");
    }
    
})();