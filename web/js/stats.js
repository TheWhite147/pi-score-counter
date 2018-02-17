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
        setGameInformationsFromScores();
        
        // Start by calculating stats for each players
        for (var i = 0; i < _lstPlayers.length; i++) {

            // Find every games for this player
            _lstPlayers[i].games = [];

            // Statistics
            _lstPlayers[i].games_played = 0;
            _lstPlayers[i].games_won = 0;
            _lstPlayers[i].games_lost = 0;
            _lstPlayers[i].overtime_wins = 0;
            _lstPlayers[i].overtime_losts = 0;
            _lstPlayers[i].shutout_wins = 0;
            _lstPlayers[i].shutout_losts = 0;
            _lstPlayers[i].services_won = 0;
            _lstPlayers[i].services_lost = 0;

            for (var j = 0; j < _lstGames.length; j++) {
                if (_lstGames[j].id_player_1 == _lstPlayers[i].id || _lstGames[j].id_player_1 == _lstPlayers[i].id) // Player played this game
                    
                    _lstPlayers[i].games_played++; // +1 game played

                    if (_lstGames[j].id_winning_player == _lstPlayers[i].id) {
                        _lstPlayers[i].games_won++; // +1 game won

                        if (_lstGames[j].is_overtime)
                            _lstPlayers[i].overtime_wins++; // +1 overtime won

                        if (_lstGames[j].is_shuttout)
                            _lstPlayers[i].shutout_wins++;

                    }
                    else {
                        _lstPlayers[i].games_lost++; // +1 game lost

                        if (_lstGames[j].is_overtime)
                            _lstPlayers[i].overtime_losts++; // +1 overtime lost

                        if (_lstGames[j].is_shuttout)
                            _lstPlayers[i].shutout_losts++;

                    }

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

function setGameInformationsFromScores() {
    
    for (var i = 0; i < _lstGames.length; i++) {
        var sumScorePlayer1 = 0;
        var sumScorePlayer2 = 0;
    
        var scores = findScores(_lstGames[i].id);

        for (var j = 0; j < scores.length; j++) {
            sumScorePlayer1 += scores[j].score_player_1;
            sumScorePlayer2 += scores[j].score_player_2;
        }

        _lstGames[i].is_overtime = isOvertimeGame(sumScorePlayer1, sumScorePlayer2);
        _lstGames[i].score_player_1 = sumScorePlayer1;
        _lstGames[i].score_player_2 = sumScorePlayer2;

        if (sumScorePlayer1 > sumScorePlayer2)
            _lstGames[i].id_winning_player = _lstGames[i].id_player_1;
        else 
            _lstGames[i].id_winning_player = _lstGames[i].id_player_2;

        if (sumScorePlayer1 == 0 || sumScorePlayer2 == 0)
            _lstGames[i].is_shuttout = true;
    }
    
}

function removeInvalidGames() {
    for (var i = 0; i < _lstGames.length; i++) {
        if (!isGameValid(_lstGames[i])) {
            _lstGames.splice(i, 1);
        }

    }
}

function isGameValid(game) {
    var gameScores = findScores(game.id);
    game.is_overtime = false;

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

    // Valid overtime score (2 points of difference if both scores are > 10)
    if (isOvertimeGame(sumScorePlayer1, sumScorePlayer2)) { // Valid overtime game
            if (Math.abs(sumScorePlayer1 - sumScorePlayer2) == 2)
                return true;
    } // Sum of scores make 11 for a player
    else if (sumScorePlayer1 == 11 || sumScorePlayer2 == 11) // Valid normal game
        return true;

    return false;
}

function isOvertimeGame(sumScorePlayer1, sumScorePlayer2) {
    if (sumScorePlayer1 >= 10 && sumScorePlayer2 >= 10)
        return true;

    return false;
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