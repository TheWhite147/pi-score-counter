    (function () {

    var _state = "0";
    var _activePlayer_1 = 0;
    var _activePlayer_2 = 0;
    var _activePlayer_1_name = "";
    var _activePlayer_2_name = "";
    var _servingPlayer = 1;
    var _readyPlayer_1 = false;
    var _readyPlayer_2 = false;
    var _scorePlayer_1 = 0;
    var _scorePlayer_2 = 0;
    var _lstPlayers = [];

    // Master view variables
    var _lastButtonActivityTime = 0;
    var _lastPlayer1Selected = -1;
    var _lastPlayer2Selected = -1;

    setInterval(handleMasterView, 1000); // Every seconds

    // Fill the players list
    getPlayersList(function() {
        setInterval(update_ui, 500);
    });

    // Refreshing handler (interval)
    function update_ui() {

        
        getUIControls(function() {

            setActiveView();

            switch (_state) {
                case 0:
                    generatePlayerList();        
                    break;
                
                case 10:
                    generatePlayerScores(false);
                    break;

                case 20:
                    generatePlayerScores(true);
                    break;

                default:
                    break;
            }
            
        });

        setClock();
    }

    // Sets the active view
    function setActiveView() {
        switch (_state) {
            case 0:
                $("#view-main-menu").show();
                $("#view-in-game").hide();
                $("#row-elo").hide();
                $("#row-compare-elo").hide();
                break;
            case 10:
            case 20:
                $("#view-main-menu").hide();
                $("#view-in-game").show();
                $("#row-elo").show();
                $("#row-compare-elo").show();
                break;
            default:
                break;
        }
    }

    function handleMasterView() {

        var now = new Date().getTime();
        
        if (_state != 0) {
            _lastButtonActivityTime = now;            
            return;
        }

        if (_lastPlayer1Selected == _activePlayer_1
            && _lastPlayer2Selected == _activePlayer_2) { // Nothing moved?
                
                if (now - _lastButtonActivityTime < 30 * 1000) // Show stats after 30 seconds of inactivity
                    return; // Still active
                else {
                    $("#master-view-play").hide(); // Hide the game, show the stats
                    $("#master-view-stats").show();
                }


            }
        else if ($("#master-view-play").is(":hidden")) { // Still active but hidden
            $("#master-view-play").show(); // Hide the stats, show the game
            $("#master-view-stats").hide();
            document.getElementById("banner-marquee").start();                    
            _lastButtonActivityTime = now;
        }
        else {
            _lastButtonActivityTime = now;
        }

        _lastPlayer1Selected = _activePlayer_1;
        _lastPlayer2Selected = _activePlayer_2;     
    }
        

    // Triggers height and scroll fixes
    function fixScroll() {

        // Fixes the height of the player lists
        var fixedPageHeight = $(window).height() - $("#nav-main-menu").outerHeight(true) - $("#row-players").outerHeight(true) - $("#banner-stats").outerHeight(true);
        $(".fixed-height").css("height", fixedPageHeight);

        // // Makes sure that the selected player is always visible
        // if (_lstPlayers.length > 0) {
        //     for (var j = 1; j <= 2; j++) {
        //         var offsetTop = $("#players-list-" + j + " .row-player.selected").offset().top - $("#banner-stats").outerHeight(true);
        //         if ($("#players-list-" + j).height() - offsetTop < 0 || offsetTop <= 0) {
        //             $("#players-list-" + j).animate({
        //                 scrollTop: Math.max(offsetTop, 0)
        //             }, 500);
        //         }
        //     }
        // }              
    }

    function setClock() {
        var now = new Date(); 
        var clockValue = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

        $("#clock").html(clockValue);
    }

    /***************************/
    /***     TEMPLATING      ***/
    /***************************/

    // Generates HTML of players list
    function generatePlayerList() {

        // NFC icon
        if (!_readyPlayer_1) {
            $("#img-nfc-player-1").show();
            $("#img-nfc-player-2").hide();
        }
        else if (!_readyPlayer_2) {
            $("#img-nfc-player-1").hide();
            $("#img-nfc-player-2").show();
        }
        
        var playerColTemplate = '<div class="col s6 row-player" data-id-player="IDPLAYER"><div class="card-panel COLOR"><span class="white-text"><h3>NAME</h3></span></div></div>';

        for (var j = 1; j <= 2; j++) {

            var lstPlayersTemplate = '';

            var isCurrentPlayerActive = false;
            var isCurrentPlayerReady = false;
            var currentPlayerTemplate = '';
            var currentPlayerColor = 'blue';

            for (var i = 0; i < _lstPlayers.length; i++) {
                
                // Reset variables
                isCurrentPlayerActive = false;
                isCurrentPlayerReady = false;
                currentPlayerTemplate = '';
                currentPlayerColor = 'blue';
                
                if (i % 2 == 0)
                    currentPlayerTemplate += '<div class="row">';

                // Set current player template
                currentPlayerTemplate += playerColTemplate;

                // Set current player state
                isCurrentPlayerActive = j == 1 ? _lstPlayers[i].id == _activePlayer_1 : _lstPlayers[i].id == _activePlayer_2;
                isCurrentPlayerReady = j == 1 ? _readyPlayer_1 : _readyPlayer_2;

                // Set selection color
                if (isCurrentPlayerActive) {
                    currentPlayerColor = 'red';

                    if (isCurrentPlayerReady) {
                        currentPlayerColor = 'green';
                    }
                }

                currentPlayerTemplate = currentPlayerTemplate.replace(/COLOR/g, currentPlayerColor);

                // Set player's name
                currentPlayerTemplate = currentPlayerTemplate.replace(/NAME/g, _lstPlayers[i].name);

                // Set view info
                currentPlayerTemplate = currentPlayerTemplate.replace(/IDPLAYER/g, _lstPlayers[i].id);
                currentPlayerTemplate = currentPlayerTemplate.replace(/SELECTED/g, isCurrentPlayerActive ? "selected" : "");

                if (i % 2 != 0)
                    currentPlayerTemplate += '</div>';

                // Add player's template to the list template
                lstPlayersTemplate += currentPlayerTemplate;
            }

            // Set template
            $("#players-list-" + j).html(lstPlayersTemplate);
        }

        fixScroll();        
    }

    // Generate players scores
    function generatePlayerScores(isGameOver) {
        var playerNamesRowTemplate = '<div class="row center"><div class="col s6 PLAYER1CLASS"><h1 class="white-text player-name">PLAYER1NAME</h1></div><div class="col s6 PLAYER2CLASS"><h1 class="white-text player-name">PLAYER2NAME</h1></div></div>';
        var playerScoresRowTemplate = '<div class="row center" id="in-game-scores"><div class="col s6 big-score PLAYER1SCORECLASS">PLAYER1SCORE</div><div class="col s6 big-score PLAYER2SCORECLASS">PLAYER2SCORE</div></div>';
        //var playerEloRowTemplate = '<div class="row"><div class="col s6 elo-player valign-wrapper" id="elo-player-1" data-id-player1-elo="PLAYER1ID"></div><div class="col s6 elo-player valign-wrapper" id="elo-player-2" data-id-player2-elo="PLAYER2ID"></div></div>'
     
        // Set names
        // Germany-Brazil easter egg
        var finalPlayer1Name = _activePlayer_1_name;
        var finalPlayer2Name = _activePlayer_2_name;

        if (_scorePlayer_1 == 7 && _scorePlayer_2 == 1) {
            finalPlayer1Name = '<img src="images/easter-eggs/germany.png" class="img-flag">';
            finalPlayer2Name = '<img src="images/easter-eggs/brazil.png" class="img-flag">';
        } else if (_scorePlayer_1 == 1 && _scorePlayer_2 == 7) {
            finalPlayer1Name = '<img src="images/easter-eggs/brazil.png" class="img-flag">';
            finalPlayer2Name = '<img src="images/easter-eggs/germany.png" class="img-flag">';
        }
        
        playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1NAME/g, finalPlayer1Name);
        playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2NAME/g, finalPlayer2Name);

        // Set classes
        if (isGameOver) {
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1CLASS/g, _scorePlayer_1 > _scorePlayer_2 ? "green": "red");
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2CLASS/g, _scorePlayer_2 > _scorePlayer_1 ? "green": "red");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORECLASS/g, _scorePlayer_1 > _scorePlayer_2 ? "green-text": "red-text");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORECLASS/g, _scorePlayer_2 > _scorePlayer_1 ? "green-text": "red-text")
        } else {
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1CLASS/g, _activePlayer_1 == _servingPlayer ? "green" : "grey");
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2CLASS/g, _activePlayer_2 == _servingPlayer ? "green" : "grey");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORECLASS/g, _activePlayer_1 == _servingPlayer ? "green-text" : "");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORECLASS/g, _activePlayer_2 == _servingPlayer ? "green-text" : "");
        }

        // Set scores
        playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORE/g, _scorePlayer_1);
        playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORE/g, _scorePlayer_2);

        // // ELO placeholder
        $("#elo-player-1").attr("data-id-player1-elo", _activePlayer_1);
        $("#elo-player-2").attr("data-id-player2-elo", _activePlayer_2);
            
        //$("#view-in-game").html(playerNamesRowTemplate + playerScoresRowTemplate + playerEloRowTemplate);
        $("#view-in-game").html(playerNamesRowTemplate + playerScoresRowTemplate);
        
    }


    /***************************/
    /***   DATABASE ACCESS   ***/
    /***************************/

    function getPlayersList(callback) {
        Api.GetPlayersList(function(data) {
            _lstPlayers = data;
            callback();
        });
    }

    function getUIControls(callback) {
        Api.GetUIControls(function(data) {
            for (var i = 0; i < data.length; i++) {
                var key = data[i].split("=")[0];
                var value = data[i].split("=")[1];
                switch (key) {
                    case "STATE":
                        var newValue = parseInt(value)
                        if (_state != newValue) {
                            Stats.TriggerNewState(newValue);
                        }
                        _state = newValue;
                        break;
                    case "ACTIVE_PLAYER_1":
                        _activePlayer_1 = value;
                        _activePlayer_1_name = _lstPlayers.find(function(el) { return el.id == _activePlayer_1 }).name;
                        break;
                    case "ACTIVE_PLAYER_2":
                        _activePlayer_2 = value;
                        _activePlayer_2_name = _lstPlayers.find(function(el) { return el.id == _activePlayer_2 }).name;
                        break;
                    case "SERVING_PLAYER":
                        _servingPlayer = value;
                        break;
                    case "READY_PLAYER_1":
                        _readyPlayer_1 = value == 1;
                        break;
                    case "READY_PLAYER_2":
                        _readyPlayer_2 = value == 1;
                        break;
                    case "SCORE_PLAYER_1":
                        _scorePlayer_1 = parseInt(value);
                        break;
                    case "SCORE_PLAYER_2":
                        _scorePlayer_2 = parseInt(value);
                        break;
                    default:
                        break;
                }        
            }

            callback();
        });
    }
    
    

  

})();