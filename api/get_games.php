<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    $pdo = new PDO('sqlite:/home/pi/pi-score-counter/pi-score-counter.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT id, id_player_1, id_player_2, created_date FROM games");
    $stmt->execute();
    
    while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
        $data = "id=" . $row[0] . "#id_player_1=" . $row[1] . "#id_player_2=" . $row[2] . "#created_date=" . $row[3] . "|";
        print $data;
    }
?>