<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/ds/doors', function(Request $request, Response $response) {
    $sql = "SELECT * FROM doorstyle_data WHERE Custom = 1";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($items);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});
// Get all SOPs items
$app->get('/ds/{query}', function(Request $request, Response $response) {
  $query = $request->getAttribute('query');
    $sql = "SELECT * FROM doorselector WHERE type = '$query'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($items);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});
