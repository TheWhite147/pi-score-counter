<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    $pdo = new PDO('sqlite:/home/pi/pi-score-counter/pi-score-counter.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT id, id_game, id_serving_player, score_player_1, score_player_2, created_date FROM scores");
    $stmt->execute();
    
    while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
        $data = "id=" . $row[0] . "#id_game=" . $row[1] . "#id_serving_player=" . $row[2] . "#score_player_1=" . $row[3] . "#score_player_2=" . $row[4] . "#created_date=" . $row[5] . "|";
        print $data;
    }
?>