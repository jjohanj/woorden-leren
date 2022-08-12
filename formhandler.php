<?php

session_start();

if(!$_SESSION['id']){
    header('location:../login/login.php');
}

$sessionId = $_SESSION['id'];
require('config.php');
  $cat = empty($_POST['cat']) ? null : $_POST['cat'];

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$stmt = $conn->prepare("SELECT * FROM categories WHERE categorie = '$cat' AND userid='$sessionId'");
$stmt->execute();
// $result = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

if ($stmt->rowCount() == 0 && $cat != null ){
  $sql = "INSERT INTO categories SET categorie=:cat, userid=:userid";
  $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
  $sth->execute(array(':cat' => $cat, ':userid' => $sessionId));
  // $conn->exec($sql);
  echo "Record categorie successfully";
}

if(isset($_POST['catdelete'])) {
    $categorie = $_POST['catdelete'];

    $sql = "DELETE FROM categories WHERE categorie=:categorie AND userid=:userid";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':categorie' => $categorie, ':userid' => $sessionId));
    // $conn->exec($sql);
    echo "Record deleted successfully";
}

if(isset($_POST['ned'])) {

  $ned = $_POST['ned'];
  $lang = $_POST['lang'];
  $cat = $_POST['cat'];

  $total = sizeof($ned);
  for($i=0;$i<$total;$i++)
  {
      $nedItem = $ned[$i];
      $langItem = $lang[$i];

      $sql = "INSERT INTO woorden SET categorie=:cat, ned=:ned, vertaling=:lang, userid=:userid";
      $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':cat' => $cat, ':ned' => $nedItem, ':lang' => $langItem, ':userid' => $sessionId ));
      // $conn->exec($sql);
      echo "Record successfully";
  }
}

$conn = null;
header("Location: /backend/?cat=success");
?>
