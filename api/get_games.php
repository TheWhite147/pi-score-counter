<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    $pdo = new PDO('sqlite:/home/pi/pi-score-counter/pi-score-counter.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // To return only the games done after this one in parameters
    $id_last_game = $_GET['id_last_game'];
    if (empty($id_last_game)) {
        $id_last_game = '0';
    }

    $stmt = $pdo->prepare("SELECT id, id_player_1, id_player_2, created_date, score_player_1, score_player_2, last_score_date FROM games WHERE id > ?");
    $stmt->execute(array($id_last_game));
    
    while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
        $data = "id=" . $row[0] . "#id_player_1=" . $row[1] . "#id_player_2=" . $row[2] . "#created_date=" . $row[3] . "#score_player_1=" . $row[4] . "#score_player_2=" . $row[5] . "#last_score_date=" . $row[6] . "|";
        print $data;
    }
?>