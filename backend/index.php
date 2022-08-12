<?php

session_start();

if(!$_SESSION['id']){
    header('location:../login/login.php');
}

$sessionId = $_SESSION['id'];

require_once('makepages.php');
require_once('../config.php');
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$stmt = $conn->prepare("SELECT categorie, wordid FROM categories WHERE userid ='$sessionId'");
$stmt->execute();

// set the resulting array to associative
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt1 = $conn->prepare("SELECT username FROM users WHERE id ='$sessionId'");
$stmt1->execute();

// set the resulting array to associative
$result1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

$stmt2 = $conn->prepare("SELECT id, ned, vertaling, categorie, active, userid FROM woorden WHERE userid ='$sessionId'");
$stmt2->execute();

// set the resulting array to associative
$result2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

$conn = null;
$form = null;
$options = null;
$queryString = empty($_GET['cat']) ? null : $_GET['cat'];

foreach ($result as $row)
{
    makeHtml($row['categorie'], $row['wordid']);

    $options[] = '<option ' . ($row['categorie'] == $queryString ? 'selected="selected"' : null ) . ' value="' . $row['categorie'] . '">
    ' . $row['categorie'] . '
    </option>';

    $text[] = '
      <li class="d-flex justify-content-between">
        <a  class="py-2" href="./' . $row['categorie'] . '.html" >
        ' . $row['categorie'] . '
        </a>
        <a href="./?cat=' . $row['categorie'] . '" class="btn btn-light m-1 px-2 pb-1 pt-0" aria-current="page"><i class="bi bi-pencil-square text-dark lh-1"></i><span class="edit-label lh-1">edit</span>
        </a>
      </li>';
    }

  $form2 =    '
   <div class="p-4">
   <form action="../formhandler.php"  method="post">
     <div class="fields">
      ' . ( $queryString == 'new' ?
        ' <div class="row">
            <div class="col-12 col-md-10 col-lg-6">
            <p class="fw-bold">Lijst naam</p>
              <input placeholder="lijst" class="form-control mb-2" name="cat" required />
            </div>
          </div>' :
        ' <input type="hidden" name="cat" value="' . $queryString . '" />' ) . '
        <div class="row mb-2 fw-bold">
          <div class="col-6 col-md-5 col-lg-3">
            <p class="mb-2">Woord</p>
          </div>
          <div class="col-6 col-md-5 col-lg-3">
            <p class="mb-2">Vertaling</p>
          </div>
        </div>
        <div class="clone row mb-2">
          <div class="col-6 col-md-5 col-lg-3">
            <input type="text" placeholder="woord" name="ned[]" class="form-control"/>
          </div>
          <div class="col-6 col-md-5 col-lg-3">
            <input type="text" placeholder="vertaling" name="lang[]" class="form-control"/>
          </div>
        </div>
      </div>
      <button class="btn btn-success mt-3" type="submit">Opslaan</button>
    </form>
    <button class="btn btn-secondary mt-3 add-button" onclick="addField()">Veld toevoegen</button>
  </div>';

  $formDelete =  '<form action="../formhandler.php" method="post">
                    <button type="submit" onclick="return confirm(\'Deze lijst verwijderen?\')" class="btn btn-danger d-inline" name="catdelete" value="' . $queryString . '" />Verwijder lijst<i class="ps-2 bi-trash"></i></button>
                  </form>';

if (isset($queryString) && $queryString != 'new' ) {

  if (!in_array($queryString, array_column($result2, 'categorie'))) {
    $formText[] = '<div>
     Lijst is leeg
    </div>';

  }

  else {
    foreach ($result2 as $row) {
    if ($row['categorie'] == $queryString) {
      $formText[] = '
      <div class="row mb-2">
        <input type="hidden" value="' . $row['id'] . '" placeholder="' . $row['id'] . '" name="id[]" class="form-control"/>
        <div class="col-xs-12 col-md-3">
          <input value="' . $row['ned'] . '" placeholder="' . $row['ned'] . '" name="ned[]" class="form-control"/>
        </div>
        <div class="col-xs-12 col-md-3">
          <input value="' . $row['vertaling'] . '" placeholder="' . $row['vertaling'] . '" name="lang[]" class="form-control"/>
        </div>
        <div class="col-xs-12 col-md-2">
          <select  class="form-select" name="cat[]">' . implode("", $options ). '</select>
        </div>
        <div class="col-xs-12 col-md-2">
        <select class="form-select" name="active[]">
        <option ' . ( $row['active'] == 1 ? 'selected="selected"' : null ) . ' value=1>
        Actief
        </option>
        <option ' . ( $row['active'] == 0 ? 'selected="selected"' : null ). ' value=0>
        Inactief
        </option></select>

        </div>
        <div class="col-1">
        <button onclick="return confirm(\'Deze regel verwijderen?\')" type="submit" class="btn btn-danger d-inline" name="sdelete" value="' . $row['id'] . '" /><i class="bi-trash"></i></button>
        </div>
      </div>';
    }
    }
  }
  $form =   '
  <form method="post" action="./formhandlerb.php">
  <div class="row mb-4">
  <input type="hidden" name="oldcat" value="' . $queryString . '"/>
    <div class="col-xs-12 col-lg-6">
      <label class="fw-bold mb-2">Lijst</label>
      <div class="input-group">
        <input name="editcat" class="form-control" value="' . $queryString . '"/>
        <button class="btn btn-success" type="submit">Wijzig naam lijst</button>
      </div>
    </div>
  </div>
  </form>

  <form method="post" action="./formhandlerb.php">
  <div class="row mb-2 fw-bold">
    <div class="col-3">Woord</div>
    <div class="col-3">Vertaling</div>
    <div class="col-2">Lijst</div>
    <div class="col-2">Status</div>
  </div>
  ' . implode('', $formText) . '
  <button class="btn btn-success mt-3" type="submit">Opslaan</button></form>';
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

<link rel="stylesheet" href="../css/main.css?version=3">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">
<link rel="stylesheet" href="../css/style.css">
  <script src="../javascript.js?verson=2"></script>

  <meta name="theme-color" content="#fafafa">
</head>

<body>
  <div class="layer"></div>
  <!-- ! Body -->
  <a class="skip-link sr-only" href="#skip-target">Skip to content</a>
  <div class="page-flex">
    <!-- ! Sidebar -->

    <aside class="sidebar">
      <div class="sidebar-start">
        <div class="sidebar-head">
          <a href="/" class="logo-wrapper" title="Home">
            <span class="sr-only">Home</span>
            <div class="logo-text">
              <span class="logo-title">Woorden-leren</span>
              <span class="logo-subtitle">Oefenen</span>
            </div>

          </a>
          <button class="sidebar-toggle transparent-btn" title="Menu" type="button">
            <span class="sr-only">Toggle menu</span>
            <i class="bi bi-justify-right fs-2 text-white"></i>
          </button>
        </div>
        <div class="sidebar-body">
          <ul class="sidebar-body-menu">
            <li>
              <a class="show-cat-btn" href="##">
                <i class="bi bi-menu-button pe-2"></i>Lijsten
                <span class="category__btn transparent-btn" title="Open list">
                  <span class="sr-only">open instellingen</span><i class="bi bi-arrow-down-circle"></i>
                </span>
              </a>
              <ul class="cat-sub-menu visible">
              ' . implode('', $text) . '
              </ul>
            </li>
          </ul>
          <ul class="sidebar-body-menu">
            <li>
              <a class="" href="./?cat=new"><i class="bi bi-folder-plus me-2"></i>Nieuwe lijst toevoegen</a>
            </li>
          </ul>
          <hr class="bg-light" />

        </div>
      </div>
      <div class="sidebar-footer">
      <div class="small text-light">Logged in as:
      ' . $result1[0]['username'] . '
      </div>
      <div>
        <a class="text-light small" href="../login/logout.php">Uitloggen</a>
      </div>
      </div>
    </aside>

        <div class="main-wrapper">
          <!-- ! Main nav -->
          <nav class="main-nav--bg">
            <div class="container main-nav">
              <div class="main-nav-start">
                        <h1 class="">' . $queryString . '</h1>
              </div>
              <div class="main-nav-end">
                <button class="sidebar-toggle transparent-btn" title="Menu" type="button">
                  <span class="sr-only">Toggle menu</span>
                          <i class="bi bi-justify-right fs-2 text-dark"></i>
                </button>
                <button class="theme-switcher gray-circle-btn" type="button" title="Switch theme">
                  <span class="sr-only">Switch theme</span>
                  <i class="bi bi-sun sun-icon" data-feather="sun" aria-hidden="true"></i>
                  <i class="bi bi-moon moon-icon" data-feather="moon" aria-hidden="true"></i>
                </button>

              </div>
            </div>
          </nav>
          <!-- ! Main -->
                  <main class="main users chart-page" id="skip-target">
                <div class="container">
                ' . ($queryString == 'new' ? $form2 :
                  ( $queryString == 'success' ? '<p>Update successvol uitgevoerd</p>' :
                  ( $queryString == null ? '<p class="display-3 text-center">Welkom</p>' : '
                <nav>
                  <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                    <button class="nav-link text-dark fw-bold active" id="nav-edit-tab" data-bs-toggle="tab" data-bs-target="#nav-edit" type="button" role="tab" aria-controls="nav-edit" aria-selected="true">Aanpassen</button>
                    <button class="nav-link text-dark fw-bold" id="nav-add-tab" data-bs-toggle="tab" data-bs-target="#nav-add" type="button" role="tab" aria-controls="nav-add" aria-selected="false">Toevoegen</button>
                    <button class="nav-link text-danger fw-bold" id="nav-del-tab" data-bs-toggle="tab" data-bs-target="#nav-del" type="button" role="tab" aria-controls="nav-del" aria-selected="false">Verwijderen</button>
                  </div>
                </nav><div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane p-4 fade show active" id="nav-edit" role="tabpanel" aria-labelledby="nav-edit-tab">' . $form . '</div>
                      <div class="tab-pane p-4 fade" id="nav-add" role="tabpanel" aria-labelledby="nav-add-tab">' . $form2 . '</div>
                      <div class="tab-pane p-4 fade show" id="nav-del" role="tabpanel" aria-labelledby="nav-del-tab">' . $formDelete . '</div>
                    </div>' ) ) ). '
                </div>
            </main>
        </div>
        <!-- Chart library -->
        <script src="../plugins/chart.min.js"></script>
        <!-- Icons library -->
        <script src="../plugins/feather.min.js"></script>
        <!-- Custom scripts -->
        <script src="../js/script.js"></script>
</body>
</htlm>';

echo($content);
?>
