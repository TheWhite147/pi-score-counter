if (typeof Stats === "undefined") { Stats = {}; }
if (typeof Stats.ComputeElo === "undefined") { Stats.ComputeElo = {}; }
if (typeof Stats.GetPlayerElo === "undefined") { Stats.GetPlayerElo = {}; }

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

var _longestGameInfo = { maxScores: 0 };
var _lastShutoutInfo = { date: 0 };


// Get initial banner stats then set interval for later updates
updateBanner();
setInterval(updateBanner, 1000 * 5) // 5 minutes - TODO: To adjust

function updateBanner() {

    getAllStatsData(function() {

        _longestGameInfo = { maxScores: 0 };
        _lastShutoutInfo = { date: 0 };

        removeInvalidGames();
        setGameInformationsFromScores();

        // Start by calculating stats for each players
        for (var i = 0; i < _lstPlayers.length; i++) {
            //debugger;
            if (_lstPlayers[i].name.indexOf("INVITÉ") > -1) {
                _lstPlayers.splice(i, 1);
                i--;
                
                continue; // Ignore invited players
            }

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

            // ELO
            _lstPlayers[i].elo = 1000; // Everyone starts with 1000 ELO
            _lstPlayers[i].elo_games = 0; // Number of ELO games counted
            _lstPlayers[i].ranking = "unranked"; // Rank from ELO

            for (var j = 0; j < _lstGames.length; j++) {

                if (_lstGames[j].id_player_1 == _lstPlayers[i].id || _lstGames[j].id_player_1 == _lstPlayers[i].id) { // Player played this game

                    _lstGames[j].real_date = new Date(parseFloat(_lstGames[j].created_date) * 1000);
                    
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

                // Longest game
                if (_lstGames[j].total_scores > _longestGameInfo.maxScores) {
                    _longestGameInfo.maxScores = _lstGames[j].total_scores;
                    _longestGameInfo.namePlayer1 = findPlayer(_lstGames[j].id_player_1).name;
                    _longestGameInfo.namePlayer2 = findPlayer(_lstGames[j].id_player_2).name;
                    _longestGameInfo.scorePlayer1 = _lstGames[j].score_player_1;
                    _longestGameInfo.scorePlayer2 = _lstGames[j].score_player_2;
                    _longestGameInfo.daysDiff = getDays(_lstGames[j].created_date);
                }

                // Last shutout
                if (_lstGames[j].is_shuttout && parseFloat(_lstGames[j].created_date) > _lastShutoutInfo.date) {
                    _lastShutoutInfo.date = parseFloat(_lstGames[j].created_date);
                    _lastShutoutInfo.namePlayer1 = findPlayer(_lstGames[j].id_player_1).name;
                    _lastShutoutInfo.namePlayer2 = findPlayer(_lstGames[j].id_player_2).name;
                    _lastShutoutInfo.scorePlayer1 = _lstGames[j].score_player_1;
                    _lastShutoutInfo.scorePlayer2 = _lstGames[j].score_player_2;
                    _lastShutoutInfo.daysDiff = getDays(_lstGames[j].created_date);
                }

            }

            // Win/Lost Ratio
            _lstPlayers[i].win_lost_ratio = Math.round((_lstPlayers[i].games_won / Math.max(_lstPlayers[i].games_lost, 1)) * 100) / 100;

        }

        setBannerText();
        Stats.ComputeElo();

    });   
}

function setBannerText() {
    var statTemplate = "<strong>STATS : </strong> NAME1 (SCORE1) - NAME2 (SCORE2) - NAME3 (SCORE3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    var uniqueStatTemplate = "<strong>STATS : </strong>CONTENT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
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
    var _lstPlayersShutoutWins = _lstPlayers.sort(function(a,b) {return (a.shutout_wins > b.shutout_wins) ? -1 : ((b.shutout_wins > a.shutout_wins) ? 1 : 0);} ); 
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

    // Stats 5 - Most played games
    var _lstPlayersPlayedGames = _lstPlayers.sort(function(a,b) {return (a.games_played > b.games_played) ? -1 : ((b.games_played > a.games_played) ? 1 : 0);} ); 
    currentStatTemplate = statTemplate
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Top nombre de parties jouées");
    currentStatTemplate = currentStatTemplate.replace(/NAME1/g, _lstPlayersPlayedGames[0].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE1/g, _lstPlayersPlayedGames[0].games_played);
    currentStatTemplate = currentStatTemplate.replace(/NAME2/g, _lstPlayersPlayedGames[1].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE2/g, _lstPlayersPlayedGames[1].games_played);
    currentStatTemplate = currentStatTemplate.replace(/NAME3/g, _lstPlayersPlayedGames[2].name);
    currentStatTemplate = currentStatTemplate.replace(/SCORE3/g, _lstPlayersPlayedGames[2].games_played);    

    bannerTemplate += currentStatTemplate;

    // Stats 6 - Longest game
    currentStatTemplate = uniqueStatTemplate;
    currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Partie la plus longue");
    currentStatTemplate = currentStatTemplate.replace(/CONTENT/g, _longestGameInfo.maxScores + " points - " + _longestGameInfo.namePlayer1 + " (" + _longestGameInfo.scorePlayer1 + ") contre " + _longestGameInfo.namePlayer2 + " (" + _longestGameInfo.scorePlayer2 + ") il y a " + _longestGameInfo.daysDiff + (_longestGameInfo.daysDiff > 1 ? " jours" : " jour"));

    bannerTemplate += currentStatTemplate;

    // Stats 7 - Last shutout
    if (_lastShutoutInfo.date != 0) {
        currentStatTemplate = uniqueStatTemplate;
        currentStatTemplate = currentStatTemplate.replace(/STATS/g, "Dernier blanchissage");
        currentStatTemplate = currentStatTemplate.replace(/CONTENT/g, _lastShutoutInfo.namePlayer1 + " (" + _lastShutoutInfo.scorePlayer1 + ") contre " + _lastShutoutInfo.namePlayer2 + " (" + _lastShutoutInfo.scorePlayer2 + ") il y a " + _lastShutoutInfo.daysDiff + (_lastShutoutInfo.daysDiff > 1 ? " jours" : " jour"));

        bannerTemplate += currentStatTemplate;
    }


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
        _lstGames[i].total_scores = sumScorePlayer1 + sumScorePlayer2;

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

function findPlayerIndex(id) {
    return _lstPlayers.findIndex(function(el) { return el.id == id })
}

function getDays(date) {
    var dateGame = parseFloat(date) * 1000;
    var now = new Date().getTime();
    var dateDiff = now - dateGame;

    return Math.floor(dateDiff / (1000 * 3600 * 24));
}

// ============================================================================================================================

Stats.ComputeElo = function(callback) {

    // Computing ELO from each game
    for (var i = 0; i < _lstGames; i++) {
        var player1 = findPlayer(_lstGames[i].id_player_1);
        var player2 = findPlayer(_lstGames[i].id_player_2);

        // Increase ELO game counter (to find K)
        player1.elo_games++;
        player2.elo_games++;

        // Set initial ELO (E(n))
        var initialEloPlayer1 = player1.elo;
        var initialEloPlayer2 = player2.elo;

        // Win or defeat (W)
        var wValuePlayer1 = _lstGames[i].id_winning_player == player1.id ? 1 : 0;
        var wValuePlayer2 = _lstGames[i].id_winning_player == player2.id ? 1 : 0;

        // Development coefficient (K)
        var kValuePlayer1 = player1.elo_games < 15 ? 20 : 10;
        var kValuePlayer2 = player2.elo_games < 15 ? 20 : 10;

        // Ranking difference (D)
        var dValuePlayer1 = initialEloPlayer2 - initialEloPlayer1;
        var dValuePlayer2 = initialEloPlayer1 - initialEloPlayer2;

        // p(D) value
        var pDValuePlayer1 = 1 / (1 + Math.pow(10, (dValuePlayer1 * -1) / 400));
        var pDValuePlayer2 = 1 / (1 + Math.pow(10, (dValuePlayer2 * -1) / 400));

        // New ELO for players
        // E(n+1) = E(n) + K * (W - p(D))
        var newEloPlayer1 = initialEloPlayer1 + kValuePlayer1 * (wValuePlayer1 - pDValuePlayer1);
        var newEloPlayer2 = initialEloPlayer2 + kValuePlayer2 * (wValuePlayer2 - pDValuePlayer2);

        player1.elo = Math.round(newEloPlayer1);
        player2.elo = Math.round(newEloPlayer2);

        // Set updated players in list
        _lstPlayers[findPlayerIndex(player1.id)] = player1;
        _lstPlayers[findPlayerIndex(player2.id)] = player2;
    }

    // Associate ranking for each players' ELO
    for (var i = 0; i < _lstPlayers; i++) {
        var elo = _lstPlayers[i].elo;

        if (elo < 800)
            _lstPlayers[i].ranking = "bronze1";
        else if (elo >= 800 && elo < 850)
            _lstPlayers[i].ranking = "bronze2";
        else if (elo >= 850 && elo < 900)
            _lstPlayers[i].ranking = "bronze3";
        else if (elo >= 900 && elo < 950)
            _lstPlayers[i].ranking = "silver1";
        else if (elo >= 950 && elo < 1000)
            _lstPlayers[i].ranking = "silver2";
        else if (elo >= 1000 && elo < 1050)
            _lstPlayers[i].ranking = "silver3";
        else if (elo >= 1050 && elo < 1100)
            _lstPlayers[i].ranking = "gold1";
        else if (elo >= 1100 && elo < 1150)
            _lstPlayers[i].ranking = "gold2";
        else if (elo >= 1150 && elo < 1200)
            _lstPlayers[i].ranking = "gold3";
        else if (elo >= 1200 && elo < 1250)
            _lstPlayers[i].ranking = "platinum1";
        else if (elo >= 1250 && elo < 1300)
            _lstPlayers[i].ranking = "platinum2";
        else if (elo >= 1300 && elo < 1350)
            _lstPlayers[i].ranking = "platinum3";
        else if (elo >= 1350 && elo < 1400)
            _lstPlayers[i].ranking = "diamond1";
        else if (elo >= 1400 && elo < 1450)
            _lstPlayers[i].ranking = "diamond2";
        else if (elo >= 1450 && elo < 1500)
            _lstPlayers[i].ranking = "diamond3";
        else if (elo >= 1500 && elo < 1550)
            _lstPlayers[i].ranking = "champion1";
        else if (elo >= 1550 && elo < 1600)
            _lstPlayers[i].ranking = "champion2";
        else if (elo >= 1600 && elo < 1650)
            _lstPlayers[i].ranking = "champion3";
        else
            _lstPlayers[i].ranking = "grandchampion";

    }

    if (callback)
        callback();
}

Stats.GetPlayerElo = function(id) {
    var player = findPlayer(id);
    return { elo: player.elo, ranking: player.ranking};
}

})();