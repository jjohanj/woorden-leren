<?php

session_start();

if(!$_SESSION['id']){
    header('location:../login/login.php');
}
$sessionId = $_SESSION['id'];
require('../config.php');
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

if(isset($_POST['sdelete'])) {
    $id = $_POST['sdelete'];

    $sql = "DELETE FROM woorden WHERE id=:id AND userid=:userid";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':id' => $id, ':userid' => $sessionId));
    // $conn->exec($sql);
    echo "Record deleted successfully";
}

if(isset($_POST['scatergorie'])) {
    $cat = $_POST['scatergorie'];

    $sql = "INSERT INTO categories SET categorie=:cat";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':cat' => $cat, ':userid' => $sessionId));
    // $conn->exec($sql);
    echo "Record categorie successfully";
}

if(isset($_POST['editcat'])) {
      $editCat = $_POST['editcat'];
      $oldCat = $_POST['oldcat'];

      print_r($editCat);

      $sql = "UPDATE woorden SET categorie=:cat WHERE categorie=:oldcat AND userid=:userid";
      $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':cat' => $editCat, ':oldcat' => $oldCat, ':userid' => $sessionId ));

      $sql = "UPDATE categories SET categorie=:cat WHERE categorie=:oldcat AND userid=:userid";
      $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':cat' => $editCat, ':oldcat' => $oldCat, ':userid' => $sessionId ));
}

else {
$ned = $_POST['ned'];
$lang = $_POST['lang'];
$cat = $_POST['cat'];
$id = $_POST['id'];
$active = $_POST['active'] ;

$total = sizeof($ned);

for($i=0;$i<$total;$i++)
  {

    $nedItem = $ned[$i];
    $langItem = $lang[$i];
    $catItem = $cat[$i];
    $idItem = $id[$i];
    $activeItem = $active[$i];

    $sql = "UPDATE woorden SET categorie=:cat, ned=:ned, vertaling=:lang, active=:active WHERE id=:id AND userid=:userid";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':cat' => $catItem, ':ned' => $nedItem, ':lang' => $langItem, ':id' => $idItem, ':active' => $activeItem, ':userid' => $sessionId ));
    // $conn->exec($sql);
    echo "Record successfully";
  }
}
$conn = null;
header("Location: /backend/?cat=success");
?>
