(function () {

// Get initial banner stats then set interval for later updates
updateBanner();
setInterval(updateBanner, 1000 * 60 * 15) // 15 minutes - TODO: To adjust


function updateBanner() {

    getBannerStats(function() {
        Api.GetScores(function(data) {
            
        });
    });

}


})();