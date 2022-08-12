<?php

require('config.php');
  $cat = empty($_POST['cat']) ? null : $_POST['cat'];

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$stmt = $conn->prepare("SELECT categorie FROM categories");
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

if (!in_array($cat, $result) && $cat != null ){
  $sql = "INSERT INTO categories SET categorie=:cat";
  $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
  $sth->execute(array(':cat' => $cat));
  // $conn->exec($sql);
  echo "Record categorie successfully";
}

if(isset($_POST['catdelete'])) {
    $categorie = $_POST['catdelete'];

    $sql = "DELETE FROM categories WHERE categorie=:categorie";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':categorie' => $categorie));
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

      $sql = "INSERT INTO woorden SET categorie=:cat, ned=:ned, vertaling=:lang";
      $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':cat' => $cat, ':ned' => $nedItem, ':lang' => $langItem ));
      // $conn->exec($sql);
      echo "Record successfully";
  }
}

$conn = null;
header("Location: /backend/?cat=success");
?>
