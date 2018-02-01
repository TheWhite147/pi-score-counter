(function () {

    var _state = 0;
    var _activePlayer_1 = 0;
    var _activePlayer_2 = 0;
    var _activePlayer_1_name = "";
    var _activePlayer_2_name = "";
    var _servingPlayer = 0
    var _readyPlayer_1 = false;
    var _readyPlayer_2 = false;
    var _lstPlayers = [];

    // Refreshing UI every seconds
    update_ui();
    setInterval(update_ui, 1000);

    // Fill the players list
    getPlayersList();

    // Refreshing handler (interval)
    function update_ui() {

        getUIControls();
        setActiveView();        

        switch (_state) {
            case 0:
                break;
            
            case 10:
                break;

            case 20:
                break;
        }
    }

    // Gets the list of players from database
    function getPlayersList() {
        // TODO: Fetch players table
    }

    // Gets UI controls from database
    function getUIControls() {
        // TODO: Fetch ui_controls table
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

})();