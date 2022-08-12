<?php

require('config.php');
//Execute Your Query
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT ned, vertaling FROM woorden");
  $stmt->execute();

  // set the resulting array to associative
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$conn = null;

foreach ($result as $row)
{
  print_r($row['ned']);
  $text[] = '<li>' . $row['ned'] . '
  </li>';
}
$test = '<html>
<head></head>
<body class="page_bg"><ul>

' . implode('', $text) . '

</ul>
</body>
</html>';

echo($test);

$filename = 'testpage.html';

$File = fopen($filename, 'w+');

$Status = fwrite($File, $test);

fclose($File);

?>
