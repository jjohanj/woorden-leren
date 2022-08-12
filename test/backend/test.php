<?php

  require('../config.php');

  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT ned, vertaling, categorie FROM woorden WHERE categorie = 'test'");
    $stmt->execute();

    // set the resulting array to associative
    $result2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }

  $conn = null;

  foreach ($result2 as $row)
  {
    $data[] = '<p>
    ' . $row["ned"] . '
    </p>';

  }

   echo('<!doctype html>
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
    <div class="container mt-5">' . implode("", $data) . '

  </div>
    <script>let cat ="test"</script>
    <script src="js/talen/test.js?v=1.01"></script>
    <script src="js/talen/test.js?v=1.01"></script>
    <script src="js/vendor/modernizr-3.11.2.min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>

  </html>') ?>
