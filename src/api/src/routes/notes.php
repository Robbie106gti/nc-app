<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Get all SOPs items
$app->get('/notes/all', function(Request $request, Response $response) {
    $sql = "SELECT notes.*, content.content, content.codes, content.title, lines.custom, lines.cornerstone
    FROM `notes`
		JOIN `content` ON notes.content_id = content.id
		JOIN `lines` ON notes.lines_id = lines.id
    WHERE notes.active = 1 ";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $last_id = $db->lastInsertId();

        $notes = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($notes);
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});
/*
$app->get('/notes/test', function(Request $request, Response $response) {
  // Get the contents of the JSON file
  $notesJSONfile = file_get_contents('https://webquoin.com/catalog/api/src/json/helpers.json');
  // Convert to array
  $jsonFile = json_decode($notesJSONfile, true);
    try {
      $notes = $jsonFile.notes;
      // foreach($notes as $note){
      for($i=1; $i<=2; $i++) {
        // Code to be executed
        $title = $notes[$i].title;
        $content = $notes[$i].content;
        $codes = ($notes[$i].itemcodes ? $notes[$i].itemcodes : null);
        $link = ($notes[$i].contentLink ? $notes[$i].contentLink : null);
        $link_url  = ($notes[$i].link ? $notes[$i].link : null);
        $content_id = insertIntoContent($title, $content, $codes, $link, $link_url);
        var_dump($content_id);
      }

  } catch(PDOException $e){
      echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
  }
});

function insertIntoContent($title, $content, $codes, $link, $link_url) {
  $sql = "INSERT INTO content (title, content, codes, link, link_url) VALUES(:title, :content, :codes, :link, :link_url)";

  try {
      // Get DB Object
      $db = new db();
      // Connect
      $db = $db->connect();

      $stmt = $db->prepare($sql);
      $stmt->bindParam(':title', $title);
      $stmt->bindParam(':content', $content);
      $stmt->bindParam(':codes', $codes);
      $stmt->bindParam(':link', $link);
      $stmt->bindParam(':link_url', $link_url);

      $stmt->execute();

      $last_id = $db->lastInsertId();
      return $last_id;
  } catch(PDOException $e){
      echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
  }
} */

/*
$app->post('/search/add', function(Request $request, Response $response) {
    $title = $request->getParam('title');

    $sql = "INSERT INTO search (title) VALUES(:title)";

    try {
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':title', $title);

        $stmt->execute();

        echo json_encode('{"notice": {"text": "Item added"}}');
    } catch(PDOException $e){
        echo json_encode('{"Error": {"text": '.$e->getMessage().'}');
    }
});
$sql = "INSERT INTO `notes` (`uid`, `active`, `content_id`, `lines_id`, `type`) VALUES ( '3d44b660-8326-11e9-8099-139f9ba4d4f1', 'Base Full Door(s)', '17', '1')"
    $last_id = $db->lastInsertId();
 */
