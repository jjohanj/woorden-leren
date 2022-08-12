<?php
session_start();

if(!$_SESSION['id']){
    header('location:./login/login.php');
}
$sessionId = $_SESSION['id'];
require('config.php');
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT categorie, wordid FROM categories WHERE userid = $sessionId");
  $stmt->execute();

  // set the resulting array to associative
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$conn = null;

foreach ($result as $row)
{

  makeHtml($row['categorie'], $row['wordid']);
  $text[] = '
  <li class="col-xs-6 col-md-3">
    <a class="btn btn-lg btn-dark w-100" href="./' . $row['categorie'] . '.html">' . $row['categorie'] . '</a>
  </li>';
}

function makeHtml ($category, $wordid) {
  $page =
  '<!doctype html>
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

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
      <link rel="stylesheet" href="css/bootstrap.css">

    <meta name="theme-color" content="#fafafa">
  </head>

  <body class="">
    <div class="container mt-5">
    <!-- Add your site or application content here -->
    <h1 class="py-2 display-6 mb-3">Engelse woorden leren</h1>
    <div class="d-flex flex-column-reverse flex-md-row mb-5">
      <div>
        <button class="btn btn-warning btn-sm  mb-2 me-2" onclick="showSolution();">Toon antwoord</button>
      </div>
      <div>
        <button type="button" class="btn btn-secondary btn-sm mb-2 me-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">Toon alle woorden en antwoorden</button>
      </div>
      <div>
        <button class="btn-reverse btn-secondary btn btn-sm  mb-2 me-2" onclick="setReverse()">Oefen andersom</button>
      </div>
    </div>
    <div class="row">

    <div class="col-md-6 col-xs-12">

    <div class="d-flex">

    <p id="word" class="fs-2"></p>
      <p id="solution" class="fs-2 ps-4" ></p>
    </div>

    <div class="input-group mb-3 input-group-lg">
    <input type="text" class="form-control"  id="text" >
    <button id="send" class="btn btn-success" type="button" onclick="getInputValue();">Verstuur</button>
  </div>
  <p><input type="checkbox" class="checkbox" id="myCheck"><label class="ms-2" for="myCheck">Ook speciale tekens goed invullen</label></p>


  </div>
  <div class="col-xs-12 col-md-5 offset-md-1 pt-6">
    <p class="fs-3 mt-1">Goede antwoorden:</p>
    <p class="sub mt-0"><span id="countcorrect"></span> van de <span id="count"></span></p>

    </p>
    <ul class="succes fs-5"></ul>
  </div>
  <button type="button" class="btn btn-primary btn-modal d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

  </button>

  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><span class="modal-solution fs-3"></span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-bold fs-3">
        </div>
        <div class="modal-footer  align-items-baseline">
          <span>
            Mijn antwoord:
          </span>
          <span class="myanswer text-start fs-4 ps-2">
          </span>
        </div>
        <button onclick="wrongRight()" class="border border-2 py-2 btn-outline-success">Reken mijn antwoord goed</button>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel2"><span class="modal-solution fs-3"></span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-bold text-dark text-start" id="allwords">
        </div>
      </div>
    </div>
  </div>
  </div>
    <script>let cat ="' . $category . '"</script>
    <script src="js/talen/' . $category . '.js?v=1.01"></script>
    <script src="js/talen/test.js?v=1.01"></script>
    <script src="js/vendor/modernizr-3.11.2.min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/bootstrap.js"></script>
    </div>
  </body>

  </html>
';

  $filename = $category . '.html';

  $File = fopen($filename, 'w+');

  $Status = fwrite($File, $page);

  fclose($File);

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

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/bootstrap.css">

  <meta name="theme-color" content="#fafafa">
</head>

<body class="">
  <div class="container mt-5">
  <ul class="row list-unstyled gy-2">
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./engels.html">Engels</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./engels2.html">Engels 2</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./engels4.html">Engels 4</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans.html">Frans</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans2.html">Frans 2</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans4.html">Frans 4</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100"  href="./frans5.html">Frans 5</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans6.html">Frans 6</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans8.html">Frans 8</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans10.html">Frans 10</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans2-1.html">Frans 2-1</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./frans2-2.html">Frans 2-2</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./latijn.html">Latijn</a></li>
  <li class="col-xs-6 col-md-3"><a class="btn btn-lg btn-dark w-100" href="./servus.html">Latijn Servus</a></li>
  '
  . implode('', $text) .
  '

  </ul>
    <a class="btn btn-lg btn-outline-danger" href="./backend/">Edit / toevoegen</a>
  </div>
  </body>
  </htlm>';

echo($content);
?>
