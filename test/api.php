<?php
require('config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");


 $category = $_GET['id'];
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT ned, vertaling FROM woorden WHERE active=1 AND categorie = '$category'");

  $stmt->execute();

  // set the resulting array to associative
  $result = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
  echo (json_encode($result));
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$conn = null;

?>
