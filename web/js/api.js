
if (typeof Api === "undefined") { Api = {}; }
if (typeof Api.GetPlayersList === "undefined") { Api.GetPlayersList = {}; }
if (typeof Api.GetUIControls === "undefined") { Api.GetUIControls = {}; }

(function () {

    // Gets the list of players from database
    Api.GetPlayersList = function(callback){
        var tmpLstPlayers = [];
        $.get("http://localhost/api/get_players.php", function(data) {
            var objects = stripLastChar(data).split("|");
            for (var i = 0; i < objects.length; i++) {
                var id = objects[i].split("=")[0];
                var name = objects[i].split("=")[1];
                tmpLstPlayers.push({ id: id, name: decodeURIComponent(name)});
            }
            callback(tmpLstPlayers);
        });        
    }

    // // Gets UI controls from database
    Api.GetUIControls = function(callback) {
        $.get("http://localhost/api/get_ui_controls.php", function(data) {
                var objects = stripLastChar(data).split("|");
                callback(objects);
        });
    }

    // // Gets all scores from database
    Api.GetScores = function(callback) {
        var tmpScores = [];
        $.get("http://localhost/api/get_scores.php", function(data) {
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

                callback(tmpScores);
        });
    }

    // Strips last char of string
    function stripLastChar(myString) {
        return myString.substring(0, myString.length - 1).trim();
    }

})();