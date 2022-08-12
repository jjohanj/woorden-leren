<?php

require('../config.php');
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT categorie, wordid FROM categories");
  $stmt->execute();

  // set the resulting array to associative
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT id, ned, vertaling, categorie, active FROM woorden");
  $stmt->execute();

  // set the resulting array to associative
  $result2 = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
$form = null;

$queryString = empty($_GET['cat']) ? null : $_GET['cat'];
  $form2 =    '
   <div>
   <form action="../formhandler.php"  method="post">
     <div class="fields">
      ' . ( $queryString == 'new' ?
        ' <div class="row">
            <div class="col-12 col-md-10 col-lg-6">
              <input placeholder="categorie" class="form-control mb-2" name="cat" />
            </div>
          </div>' :
        ' <input type="hidden" name="cat" value="' . $queryString . '" />' ) . '
        <div class="clone row mb-2">
          <div class="col-6 col-md-5 col-lg-3">
            <input placeholder="woord" name="ned[]" class="form-control"/>
          </div>
          <div class="col-6 col-md-5 col-lg-3">
            <input placeholder="vertaling" name="lang[]" class="form-control"/>
          </div>
        </div>
      </div>
      <button class="btn btn-success mt-3" type="submit">Submit</button>
    </form>
    <button class="btn btn-outline-success mt-3 add-button btn-lg" onclick="addField()">Add field</button>
  </div>';

  $formDelete =  '<form action="../formhandler.php" method="post">
                    <button type="submit" class="btn btn-danger d-inline" name="catdelete" value="' . $queryString . '" />Verwijder categorie<i class="ps-2 bi-trash"></i></button>
                  </form>';

if (isset($queryString) && $queryString != 'new' ) {

  if (!in_array($queryString, array_column($result2, 'categorie'))) {
    $formText[] = '<div>
     Categorie is leeg
    </div>';

  }

  else {
    foreach ($result2 as $row) {
    if ($row['categorie'] == $queryString) {
      $formText[] = '
      <div class="row mb-2">
        <input type="hidden" value="' . $row['id'] . '" placeholder="' . $row['id'] . '" name="id[]" class="form-control"/>
        <div class="col-3">
          <input value="' . $row['ned'] . '" placeholder="' . $row['ned'] . '" name="ned[]" class="form-control"/>
        </div>
        <div class="col-3">
          <input value="' . $row['vertaling'] . '" placeholder="' . $row['vertaling'] . '" name="lang[]" class="form-control"/>
        </div>
        <div class="col-2">
          <input value="' . $row['categorie'] . '" placeholder="' . $row['categorie'] . '" name="cat[]" class="form-control"/>
        </div>
        <div class="col-2">
        <select class="form-select" name="active[]">
        <option ' . ( $row['active'] == 1 ? 'selected="selected"' : null ) . ' value=1>
        Actief
        </option>
        <option ' . ( $row['active'] == 0 ? 'selected="selected"' : null ). ' value=0>
        Inactief
        </option></select>

        </div>
        <div class="col-1">
        <button type="submit" class="btn btn-danger d-inline" name="sdelete" value="' . $row['id'] . '" /><i class="bi-trash"></i></button>
        </div>
      </div>';
    }
    }
  }
  $form =   '<form method="post" action="./formhandlerb.php">
  ' . implode('', $formText) . '
  <button class="btn btn-success mt-3" type="submit">Submit</button></form>';
}

$conn = null;


foreach ($result as $row)
{
    $text[] = '

    <li class="nav-item">
      <a href="./?cat=' . $row['categorie'] . '" class="nav-link text-white" aria-current="page">
        <svg class="bi me-2" width="16" height="16"></svg>
        ' . $row['categorie'] . '
      </a>
    </li>';
}
$content = '<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  <!-- Place favicon.ico in the root directory -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/bootstrap.css">
    <script src="../javascript.js"></script>
    <script src="../js/vendor/modernizr-3.11.2.min.js"></script>
    <script src="../js/plugins.js"></script>
      <script src="../js/bootstrap.js"></script>

  <meta name="theme-color" content="#fafafa">
</head>

<body class="">
  <div class="sidebar-container">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
      <a href="/backend/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Categorie:</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
      ' . implode('', $text) . '
      <li>
      <hr>
      <a class=" btn btn-success btn-block w-100" href="./?cat=new">New</a>
      <hr>
      </li>
      </ul>
    </div>
    <div class="pt-3 pe-5">
    <h1 class="mb-5">' . $queryString . '</h1>
    ' . ($queryString == 'new' ? $form2 : ( $queryString == 'success' ? '<p>Update successvol uitgevoerd</p>' : '
    <nav>
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
        <button class="nav-link text-dark active" id="nav-edit-tab" data-bs-toggle="tab" data-bs-target="#nav-edit" type="button" role="tab" aria-controls="nav-edit" aria-selected="true">Edit</button>
        <button class="nav-link text-dark" id="nav-add-tab" data-bs-toggle="tab" data-bs-target="#nav-add" type="button" role="tab" aria-controls="nav-add" aria-selected="false">Add</button>
        <button class="nav-link text-danger" id="nav-del-tab" data-bs-toggle="tab" data-bs-target="#nav-del" type="button" role="tab" aria-controls="nav-del" aria-selected="false">Delete</button>
      </div>
    </nav><div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-edit" role="tabpanel" aria-labelledby="nav-edit-tab">' . $form . '</div>
          <div class="tab-pane fade" id="nav-add" role="tabpanel" aria-labelledby="nav-add-tab">' . $form2 . '</div>
          <div class="tab-pane fade show" id="nav-del" role="tabpanel" aria-labelledby="nav-del-tab">' . $formDelete . '</div>
        </div>' ) ). '

    </div>
  </div>
</body>
</htlm>';

echo($content);
?>
