
<?php
session_start();
require('../config.php');

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbase", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

if(isset($_POST['submit']))
{
	if(isset($_POST['username'],$_POST['password']) && !empty($_POST['username']) && !empty($_POST['password']))
	{
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);

		if(filter_var($username))
		{
			$sql = "select * from users where username = :username ";
			$handle = $conn->prepare($sql);
			$params = ['username'=>$username];
			$handle->execute($params);
			if($handle->rowCount() > 0)
			{
				$getRow = $handle->fetch(PDO::FETCH_ASSOC);
				if(password_verify($password, $getRow['password']))
				{
					unset($getRow['password']);
					$_SESSION = $getRow;
					header('location:../backend/index.php');
					exit();
				}
				else
				{
					$errors[] = "Wrong Username or Password";
				}
			}
			else
			{
				$errors[] = "Wrong Username or Password";
			}

		}
		else
		{
			$errors[] = "Username is not valid";
		}

	}
	else
	{
		$errors[] = "Username and Password are required";
	}

}

$conn = null;
?>

<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Login</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/style.css">

</head>
<body>
  <header class="bg-white mb-4 border-bottom">
    <div class="container  d-flex flex-wrap align-items-center justify-content-between py-5 ">

        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-3">
        Woorden-leren
        </a>

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" class="nav-link px-2 link-dark">Lijsten</a></li>
          <li><a href="/faq.php" class="nav-link px-2 link-dark">FAQs</a></li>
        </ul>

        <div class="col-md-3 text-end">
          <a href="/login/login.php" class="btn btn-outline-success me-2">Login</a>
          <a href="/login/register.php" class="btn btn-success">Sign-up</a>
        </div>
        </div>
      </header>
<section class="mt-5">
<div class="container-fluid container-lg h-custom">
	<div class="row d-flex justify-content-center align-items-center">
    <div class="col-md-12 col-lg-6 col-xl-5">
      <img src="../img/undraw_education_f8ru.svg" class="img-fluid p-5"
      alt="">
    </div>
		<div class="col-md-12 col-lg-6 col-xl-4 offset-xl-1">
			<h1 class="display-4 mb-3" >Login</h1>
			<?php
				if(isset($errors) && count($errors) > 0)
				{
					foreach($errors as $error_msg)
					{
						echo '<div class="alert alert-danger">'.$error_msg.'</div>';
					}
				}
			?>
			<form method="POST" action="<?php echo $_SERVER['PHP_SELF'];?>">
				<div class="form-outline mb-4">
					<label class="form-label" for="username">Username:</label>
					<input type="text" name="username" placeholder="Enter username" class="form-control bg-light form-control-lg">
				</div>
				<div class="form-outline mb-3">
				<label class="form-label" for="email">Password:</label>
					<input type="password" name="password" placeholder="Enter Password" class="form-control bg-light form-control-lg">
				</div>
        <div class="mt-4 pt-2">
				  <button type="submit" name="submit" class="btn btn-primary btn-lg">Inloggen</button>
        </div>
        <p class="small fw-bold mt-2 pt-1 mb-0">Nog geen account?
				<a href="register.php" class="link-danger">Registreer</a></p>
			</form>
		</div>
	</div>
</div>
</section>
</body>
</html>
