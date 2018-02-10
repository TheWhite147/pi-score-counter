<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    $pdo = new PDO('sqlite:/home/pi/pi-score-counter/pi-score-counter.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT key, value FROM ui_controls");
    $stmt->execute();
    
    while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
        $data = $row[0] . "=" . $row[1] . "|";
        print $data;
    }
?>