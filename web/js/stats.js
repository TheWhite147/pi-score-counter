(function () {


/* _lstPlayers will contain original data, but we will add stats data like:
    - Number of games played
    - Number of games won
    - Number of games lost
    - Number of overtime wins
    - Number of overtime losts
    - Number of shutout wins
    - Number of shutout losts
*/

var _lstPlayers = [];
var _lstGames = [];
var _lstScores = [];


// Get initial banner stats then set interval for later updates
updateBanner();
setInterval(updateBanner, 1000 * 60 * 5) // 5 minutes - TODO: To adjust


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

            for (var j = 0; j < _lstGames.length; j++) {

                if (_lstGames[j].id_player_1 == _lstPlayers[i].id || _lstGames[j].id_player_1 == _lstPlayers[i].id) { // Player played this game
                    
                    _lstPlayers[i].games.push(_lstGames[j]); // Add game to player

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
                            _lstPlayers[i].shutout_losts++; // +1 shutout lost

                    }
                }
            }

            _lstPlayers[i].win_lost_ratio = Math.round((_lstPlayers[i].games_won / Math.max(_lstPlayers[i].games_lost, 1)) * 100) / 100;
        }

        setBannerText();

    });   
}

function setBannerText() {
    var statTemplate = "<strong>STATS : </strong> NAME1 (SCORE1) - NAME2 (SCORE2) - NAME3 (SCORE3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    var bannerTemplate = "";

    var currentStatTemplate = statTemplate;

    // Stats 1 - Most won games
    var _lstPlayersMostWonGames = _lstPlayers.sort(function(a,b) {return (a.games_won > b.games_won) ? -1 : ((b.games_won > a.games_won) ? 1 : 0);} ); 
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Top victoires");
    currentStatTemplate = currentStatTemplate.replace(/NAME1/g, _lstPlayersMostWonGames[0].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE1/g, _lstPlayersMostWonGames[0].games_won);
    currentStatTemplate = currentStatTemplate.replace(/NAME2/g, _lstPlayersMostWonGames[1].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE2/g, _lstPlayersMostWonGames[1].games_won);
    currentStatTemplate = currentStatTemplate.replace(/NAME3/g, _lstPlayersMostWonGames[2].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE3/g, _lstPlayersMostWonGames[2].games_won);

    bannerTemplate += currentStatTemplate;

    // Stats 2 - Win/Lost Ratio
    var _lstPlayersWinLostRatio = _lstPlayers.sort(function(a,b) {return (a.win_lost_ratio > b.win_lost_ratio) ? -1 : ((b.win_lost_ratio > a.win_lost_ratio) ? 1 : 0);} ); 
    currentStatTemplate = statTemplate
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Ratio V/D");
    currentStatTemplate = currentStatTemplate.replace(/NAME1/g, _lstPlayersMostWonGames[0].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE1/g, _lstPlayersMostWonGames[0].win_lost_ratio);
    currentStatTemplate = currentStatTemplate.replace(/NAME2/g, _lstPlayersMostWonGames[1].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE2/g, _lstPlayersMostWonGames[1].win_lost_ratio);
    currentStatTemplate = currentStatTemplate.replace(/NAME3/g, _lstPlayersMostWonGames[2].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE3/g, _lstPlayersMostWonGames[2].win_lost_ratio);    

    bannerTemplate += currentStatTemplate;

    // Stats 3 - Most shutout wins
    var _lstPlayersShutoutWins = _lstPlayers.sort(function(a,b) {return (a.overtime_wins > b.overtime_wins) ? -1 : ((b.overtime_wins > a.overtime_wins) ? 1 : 0);} ); 
    currentStatTemplate = statTemplate
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Top blanchissages");
    currentStatTemplate = currentStatTemplate.replace(/NAME1/g, _lstPlayersMostWonGames[0].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE1/g, _lstPlayersMostWonGames[0].shutout_wins);
    currentStatTemplate = currentStatTemplate.replace(/NAME2/g, _lstPlayersMostWonGames[1].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE2/g, _lstPlayersMostWonGames[1].shutout_wins);
    currentStatTemplate = currentStatTemplate.replace(/NAME3/g, _lstPlayersMostWonGames[2].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE3/g, _lstPlayersMostWonGames[2].shutout_wins);    

    bannerTemplate += currentStatTemplate;

    // Stats 4 - Most overtime wins
    var _lstPlayersOvertimeWins = _lstPlayers.sort(function(a,b) {return (a.overtime_wins > b.overtime_wins) ? -1 : ((b.overtime_wins > a.overtime_wins) ? 1 : 0);} ); 
    currentStatTemplate = statTemplate
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Top victoires en prolongation");
    currentStatTemplate = currentStatTemplate.replace(/NAME1/g, _lstPlayersMostWonGames[0].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE1/g, _lstPlayersMostWonGames[0].overtime_wins);
    currentStatTemplate = currentStatTemplate.replace(/NAME2/g, _lstPlayersMostWonGames[1].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE2/g, _lstPlayersMostWonGames[1].overtime_wins);
    currentStatTemplate = currentStatTemplate.replace(/NAME3/g, _lstPlayersMostWonGames[2].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE3/g, _lstPlayersMostWonGames[2].overtime_wins);    

    bannerTemplate += currentStatTemplate;


    $("#banner-stats-content").html(bannerTemplate);

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
            sumScorePlayer1 += parseInt(scores[j].score_player_1);
            sumScorePlayer2 += parseInt(scores[j].score_player_2);
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
            i--;
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

        sumScorePlayer1 += parseInt(gameScores[i].score_player_1);
        sumScorePlayer2 += parseInt(gameScores[i].score_player_2);
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
    if (parseInt(sumScorePlayer1) >= 10 && parseInt(sumScorePlayer2) >= 10)
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