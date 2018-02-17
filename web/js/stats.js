(function () {


/* _lstPlayers will contain original data, but we will add stats data like:
    - Number of games played
    - Number of games won
    - Number of games lost
    - Number of overtime wins
    - Number of overtime losts
    - Number of shutout wins
    - Number of shutout losts
    - Number of services won
    - Number of services lost
*/

var _lstPlayers = [];
var _lstGames = [];
var _lstScores = [];


// Get initial banner stats then set interval for later updates
updateBanner();
setInterval(updateBanner, 1000 * 60 * 15) // 5 minutes - TODO: To adjust


function updateBanner() {

    getAllStatsData(function() {

        removeInvalidGames();
        
        // Start by calculating stats for each players
        for (var i = 0; i < _lstPlayers.length; i++) {

            // Find every valid games for this player
            _lstPlayers[i].games = [];

            for (var j = 0; j < _lstGames.length; j++) {
                if (isGameValid(_lstGames[j]) // Is the game valid?
                && (_lstGames[j].id_player_1 == _lstPlayers[i].id || _lstGames[j].id_player_1 == _lstPlayers[i].id))
            }
        }
    });
    

}


function getAllStatsData(callback) {
    Api.GetPlayersList(function(players) {
        _lstPlayers = players;
        
        Api.GetGames(function(games) {
            _lstGames = games;

            Api.GetScores(function(scores) {
                _lstScores = scores;

                callback();
            });
        });            
    });
}




function removeInvalidGames() {
    for (var i = 0; i < _lstGames.length; i++) {
        if (!isGameValid(_lstGames[i])) {
            // Remove games and scores
        }

    }
}

function isGameValid(game) {
    var gameScores = findScores(game.id);

    /* Is the game completed?
        - Sum of scores make 11 for a player
        - Valid overtime score (2 points of difference if both scores are > 10)
        - Id of players in the scores (serving) are the same for the game (to fix a multiple instances bug)
    */

    var sumScorePlayer1 = 0;
    var sumScorePlayer2 = 0;

    for (var i = 0; i < gameScores.length; i++){
        //  Id of players in the scores (serving) are the same for the game
        if (!(gameScores[i].id_serving_player == game.id_player_1 || gameScores[i].id_serving_player == game.id_player_2))
            return false;

        sumScorePlayer1 += gameScores[i].score_player_1;
        sumScorePlayer2 += gameScores[i].score_player_2;
    }

    // Check score + overtime handling
}


function findPlayer(id) {
    return _lstPlayers.find(function(el) { return el.id == id })
}

function findGame(id) {
    return _lstGames.find(function(el) { return el.id == id })
}

function findScores(idGame) {
    var scores = [];
    
    for (var i = 0; i < _lstScores.length; i++) {
        if (_lstScores[i].id_game == idGame)
            scores.push(_lstScores[i]);
    }

    return scores;
}

})();