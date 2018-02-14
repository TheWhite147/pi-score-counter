(function () {


var _lstPlayers = [];
var _lstScores = [];


// Get initial banner stats then set interval for later updates
updateBanner();
setInterval(updateBanner, 1000 * 60 * 15) // 15 minutes - TODO: To adjust


function updateBanner() {

    getBannerStats(function() {
        Api.GetScores(function(scores) {
            _lstScores = scores;
            Api.GetPlayersList(function(players) {
                _lstPlayers = players;
                
                

            });            
        });
    });

}

function findPlayer(id) {
    _lstPlayers.find(function(el) { return el.id == id })
}


})();