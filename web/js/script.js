(function () {

    var _state = 0;
    var _activePlayer_1 = 1;
    var _activePlayer_2 = 7;
    var _activePlayer_1_name = "";
    var _activePlayer_2_name = "";
    var _servingPlayer = 0;
    var _readyPlayer_1 = false;
    var _readyPlayer_2 = false;
    var _lstPlayers = [];

    // Debug
    var enableMockPlayers = false;
    var enableMockButtons = false;

    // Binds buttons (debug)
    if (enableMockButtons) {
        $(document).on("keydown", function() {
            _activePlayer_1++;
        });
    }

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
                break;

            case 20:
                break;
        }
    }

    // Sets the active view
    function setActiveView() {
        if (_state == 0) {
            $("#view-main-menu").show();
            $("#view-in-game").hide();
        }
        else {
            $("#view-main-menu").hide();
            $("#view-in-game").show();
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


    /***************************/
    /***   DATABASE ACCESS   ***/
    /***************************/

    // Gets the list of players from database
    function getPlayersList() {
        if (enableMockPlayers)
            mockPlayers();
    }

    // Gets UI controls from database
    function getUIControls() {
        // TODO: Fetch ui_controls table
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

})();