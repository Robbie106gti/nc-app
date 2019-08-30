<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Get all SOPs items
$app->get('/sops/all', function(Request $request, Response $response) {
    $sql = "SELECT * FROM search";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $links = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($links);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});

// Get section of sub items
$app->get('/sops/{sub}', function(Request $request, Response $response) {
    $sub = $request->getAttribute('sub');
    $sql = "SELECT * FROM search WHERE `subCat` = '' AND `sub` = '$sub' AND `subCat` NOT LIKE 'false'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $links = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($links);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});

// Get section sub of sub items
$app->get('/sops/{sub}/{subsub}', function(Request $request, Response $response) {
    $sub = $request->getAttribute('sub');
    $subsub = $request->getAttribute('subsub');
    $sql = "SELECT * FROM search WHERE `sub` = '$sub' AND `subCat` = '$subsub'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $links = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($links);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});