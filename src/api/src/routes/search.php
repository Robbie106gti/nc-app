<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app = new \Slim\App;
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response;
});

// Get all Search items
$app->get('/search', function(Request $request, Response $response) {
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
        echo '{"Error": {"text": '.$e->getMessage().'}';
    }
});

// Get Single Item
$app->get('/search/s/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM search WHERE id = '$id'";
    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();
        $stmt = $db->query($sql);
        $item = $stmt->fetch(PDO::FETCH_OBJ);
        echo json_encode($item);
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

$app->get('/search/{query}', function(Request $request, Response $response) {
    $query = $request->getAttribute('query');
    $sql = "SELECT * FROM search WHERE content LIKE '%{$query}%' OR title Like '%{$query}%'";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $search = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($search);
    } catch(PDOException $e){
        echo '{"Error": {"text": '.$e->getMessage().'}';
    }
});

$app->post('/search/add', function(Request $request, Response $response) {
    $title = $request->getParam('title');
    $id = $request->getParam('id');
    $idCat = $request->getParam('idCat');
    $sub = $request->getParam('sub');
    $link = $request->getParam('link');
    $content = $request->getParam('content');
    $type = $request->getParam('type');
    $image = $request->getParam('image');

    $sql = "INSERT INTO search (title, id, idCat, sub, link, content, type, image) VALUES(:title, :id, :idCat, :sub, :link, :content, :type, :image)";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':idCat', $idCat);
        $stmt->bindParam(':sub', $sub);
        $stmt->bindParam(':link', $link);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':image', $image);

        $stmt->execute();

        echo '{"notice": {"text": "Item added"}}';
    } catch(PDOException $e){
        echo '{"Error": {"text": '.$e->getMessage().'}';
    }
});

$app->post('/search/update/{id}', function(Request $request, Response $response) {
    $docId = $request->getAttribute('id');
    $title = $request->getParam('title');
    $id = $request->getParam('id');
    $idCat = $request->getParam('idCat');
    $sub = $request->getParam('sub');
    $link = $request->getParam('link');
    $content = $request->getParam('content');
    $type = $request->getParam('type');
    $image = $request->getParam('image');

    $sql = "UPDATE search SET title = :title, id = :id, idCat = :idCat, sub = :sub, link = :link, content = :content, type = :type, image = :image WHERE id = :docId";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':docId', $docId);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':idCat', $idCat);
        $stmt->bindParam(':sub', $sub);
        $stmt->bindParam(':link', $link);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':image', $image);

        $stmt->execute();

        echo '{"notice": {"text": "Item Updated"}}';
    } catch(PDOException $e){
        echo '{"Error": {"text": '.$e->getMessage().', title: '.$title.', id: '.$id.'}';
    }
});

$app->delete('/search/delete/{id}', function(Request $request, Response $response) {
    $docId = $request->getAttribute('id');

    $sql = "DELETE FROM search WHERE id = :docId";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':docId', $docId);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Item Deleted"}';
    } catch(PDOException $e){
        echo '{"Error": {"text": '.$e->getMessage().'}';
    }
});

