
if (typeof Api === "undefined") { Api = {}; }
if (typeof Api.GetPlayersList === "undefined") { Api.GetPlayersList = {}; }
if (typeof Api.GetUIControls === "undefined") { Api.GetUIControls = {}; }

(function () {

    var API_ADDRESS = "http://localhost/api/";

     // // Gets UI controls from database
     Api.GetUIControls = function(callback) {
        $.get(API_ADDRESS + "get_ui_controls.php", function(data) {
                var objects = stripLastChar(data).split("|");
                callback(objects);
        });
    }

    // Gets the list of players from database
    Api.GetPlayersList = function(callback){
        var tmpLstPlayers = [];
        var startDate = new Date().getTime();
        $.get(API_ADDRESS + "get_players.php", function(data) {
            var objects = stripLastChar(data).split("|");
            for (var i = 0; i < objects.length; i++) {
                var id = objects[i].split("=")[0];
                var name = objects[i].split("=")[1];
                tmpLstPlayers.push({ id: id, name: decodeURIComponent(name)});
            }

            var totalTime = new Date().getTime() - startDate;
            Log.LogPerf("Api.GetPlayersList", totalTime);
            callback(tmpLstPlayers);
        });        
    }

    // // Gets all games from database
    Api.GetGames = function(idLastGame, callback) {
        var tmpGames = [];
        var startDate = new Date().getTime();
        $.get(API_ADDRESS + "get_games.php?id_last_game=" + idLastGame, function(data) {
                var objects = stripLastChar(data).split("|");

                for (var i = 0; i < objects.length; i++) {
                    var newObject = {};

                    var columns = objects[i].split("#");
                    for (var j = 0; j < columns.length; j++) {
                        var keyValue = columns[j].split("=");
                        newObject[keyValue[0]] = keyValue[1];
                    }

                    tmpGames.push(newObject);
                }

                var totalTime = new Date().getTime() - startDate;
                Log.LogPerf("Api.GetGames", totalTime);

                callback(tmpGames);
        });
    }

    // // Gets all scores from database
    // DO NOT USE THIS FUNCTION UNLESS YOU REALLY NEED IT --> You will affect the performances of the app
    Api.GetScores = function(idLastGame, callback) {
        var tmpScores = [];
        var startDate = new Date().getTime();
        $.get(API_ADDRESS + "get_scores.php?id_last_game=" + idLastGame, function(data) {
                var objects = stripLastChar(data).split("|");
                for (var i = 0; i < objects.length; i++) {
                    var newObject = {};

                    var columns = objects[i].split("#");
                    for (var j = 0; j < columns.length; j++) {
                        var keyValue = columns[j].split("=");
                        newObject[keyValue[0]] = keyValue[1];
                    }

                    tmpScores.push(newObject);
                }

                var totalTime = new Date().getTime() - startDate;
                Log.LogPerf("Api.GetScores", totalTime);
                callback(tmpScores);
        });
    }

    // Strips last char of string
    function stripLastChar(myString) {
        return myString.substring(0, myString.length - 1).trim();
    }

})();