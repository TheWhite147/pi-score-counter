(function () {

    var _state = 0;
    var _activePlayer_1 = 1;
    var _activePlayer_2 = 1;
    var _activePlayer_1_name = "";
    var _activePlayer_2_name = "";
    var _servingPlayer = 1;
    var _readyPlayer_1 = false;
    var _readyPlayer_2 = false;
    var _scorePlayer_1 = 0;
    var _scorePlayer_2 = 0;
    var _lstPlayers = [];

    // Debug
    var enableMockPlayers = false;
    var enableMockButtons = false;

    // Binds buttons (debug)
    if (enableMockButtons)
        mockButtons();

    // Fill the players list
    getPlayersList();

    // Refreshing UI every seconds
    setInterval(update_ui, 1000);

    // Refreshing handler (interval)
    function update_ui() {
        getUIControls();
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
    }

    // Sets the active view
    function setActiveView() {
        switch (_state) {
            case 0:
                $("#view-main-menu").show();
                $("#view-in-game").hide();
                break;
            case 10:
            case 20:
                $("#view-main-menu").hide();
                $("#view-in-game").show();
                break;
            default:
                break;
        }
    }

    // Triggers height and scroll fixes
    function fixScroll() {

        // Fixes the height of the player lists
        var fixedPageHeight = $(window).height() - $("#nav-main-menu").outerHeight(true) - $("#row-players").outerHeight(true);
        $(".fixed-height").css("height", fixedPageHeight);

        // Makes sure that the selected player is always visible
        if (_lstPlayers.length > 0) {
            for (var j = 1; j <= 2; j++) {
                var offsetTop = $("#players-list-" + j + " .row-player.selected").offset().top;
                if ($(window).height() - offsetTop < 0) {
                    $("#players-list-" + j).animate({
                        scrollTop: offsetTop -  $("#players-list-" + j).height()
                    }, 500);
                }
            }
        }
    }

    /***************************/
    /***     TEMPLATING      ***/
    /***************************/

    // Generates HTML of players list
    function generatePlayerList() {
        
        var playerTemplate = '<div class="row row-player SELECTED" data-id-player="IDPLAYER"><div class="col s12"><div class="card-panel COLOR"><span class="white-text"><h3>NAME</h3></span></div></div></div>';

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
                
                // Set current player template
                currentPlayerTemplate = playerTemplate;

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
        var playerNamesRowTemplate = '<div class="row center"><div class="col s6 PLAYER1CLASS"><h1 class="white-text">PLAYER1NAME</h1></div><div class="col s6 PLAYER2CLASS"><h1 class="white-text">PLAYER2NAME</h1></div></div>';
        var playerScoresRowTemplate = '<div class="row center" id="in-game-scores"><div class="col s6 big-score PLAYER1SCORECLASS">PLAYER1SCORE</div><div class="col s6 big-score PLAYER2SCORECLASS">PLAYER2SCORE</div></div>';

        // Set names
        playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1NAME/g, _activePlayer_1_name);
        playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2NAME/g, _activePlayer_2_name);

        // Set classes
        if (isGameOver) {
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1CLASS/g, _scorePlayer_1 > _scorePlayer_2 ? "green": "red");
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2CLASS/g, _scorePlayer_2 > _scorePlayer_1 ? "green": "red");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORECLASS/g, _scorePlayer_1 > _scorePlayer_2 ? "green-text": "red-text");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORECLASS/g, _scorePlayer_2 > _scorePlayer_1 ? "green-text": "red-text")
        } else {
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER1CLASS/g, _activePlayer_1 == _servingPlayer ? "green" : "green lighten-4");
            playerNamesRowTemplate = playerNamesRowTemplate.replace(/PLAYER2CLASS/g, _activePlayer_2 == _servingPlayer ? "green" : "green lighten-4");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORECLASS/g, "");
            playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORECLASS/g, "");
        }

        // Set scores
        playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER1SCORE/g, _scorePlayer_1);
        playerScoresRowTemplate = playerScoresRowTemplate.replace(/PLAYER2SCORE/g, _scorePlayer_2);

        $("#view-in-game").html(playerNamesRowTemplate + playerScoresRowTemplate);
    }


    /***************************/
    /***   DATABASE ACCESS   ***/
    /***************************/

    var server_address = "http://192.168.1.53/";

    // Gets the list of players from database
    function getPlayersList() {
        if (enableMockPlayers)
            mockPlayers();
        else {

            var tmpLstPlayers = [];

            $.get("http://192.168.1.53/get_players.php", function(data) {
                var objects = stripLastChar(data).split("|");
                for (var i = 0; i < objects.length; i++) {
                    var id = objects[i].split("=")[0];
                    var name = objects[i].split("=")[1];
                    tmpLstPlayers.push({ id: id, name: decodeURIComponent(escape(name))});
                }
            });

            _lstPlayers = tmpLstPlayers;
        }
    }

    // Gets UI controls from database
    function getUIControls() {
        $.get("http://192.168.1.53/get_ui_controls.php", function(data) {
                var objects = stripLastChar(data).split("|");
                for (var i = 0; i < objects.length; i++) {
                    var key = objects[i].split("=")[0];
                    var value = objects[i].split("=")[1];

                    switch (key) {
                        case "STATE":
                            _state = value;
                            break;
                        case "ACTIVE_PLAYER_1":
                            _activePlayer_1 = value;
                            break;
                        case "ACTIVE_PLAYER_2":
                            _activePlayer_2 = value;
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
                            _scorePlayer_1 = value;
                            break;
                        case "SCORE_PLAYER_2":
                            _scorePlayer_2 = value;
                            break;
                        default:
                            break;
                    }

                }
        });
    }

    // Strips last char of string
    function stripLastChar(myString) {
        return myString.substring(0, myString.length - 1).trim();
    }

    /***************************/
    /***        MOCKS        ***/
    /***************************/

    function mockPlayers() {

        _lstPlayers = [];

        _lstPlayers.push( { id: 1, name: "Marc LeBlanc"} );
        _lstPlayers.push( { id: 2, name: "Marc Laplante"} );
        _lstPlayers.push( { id: 3, name: "Jeff"} );
        _lstPlayers.push( { id: 4, name: "Max"} );
        _lstPlayers.push( { id: 5, name: "Nicolas"} );
        _lstPlayers.push( { id: 6, name: "Mathieu"} );
        _lstPlayers.push( { id: 7, name: "Fred"} );
        _lstPlayers.push( { id: 8, name: "Martin"} );        
    }

    function mockButtons() {
        $(document).on("keydown", function(e) {
            switch(e.which) {
                case 49: // 1
                    _activePlayer_1++;
                    break;
                case 50: // 2
                    _activePlayer_2++;
                    break;
                case 81: // q
                    _readyPlayer_1 = true;
                    break;
                case 87: // w
                    _readyPlayer_2 = true;
                    break;
                case 13: // Enter
                    _state = 10;
                    _activePlayer_1 = 1;
                    _activePlayer_2 = 3;
                    _activePlayer_1_name = "Marc LeBlanc";
                    _activePlayer_2_name = "Jeff";
                    _scorePlayer_1 = 2;
                    _scorePlayer_2 = 4;
                    _servingPlayer = 1;
                    break;
                case 65: // a
                    _servingPlayer = _servingPlayer == 1 ? 3 : 1;
                    _scorePlayer_1++;
                    if (_scorePlayer_1 == 11)
                        _state = 20;

                    break;
                case 32: // Space
                    _state = 0;
                    break
                default:
                    console.log(e.which);
            }
        });
    }

})();