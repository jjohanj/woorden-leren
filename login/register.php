<?php
session_start();
require_once('../config.php');

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

        $hashPassword = password_hash($password,PASSWORD_DEFAULT);

        if(filter_var($username))
		      {
            $sql = 'select * from users where username = :username';
            $stmt = $conn->prepare($sql);
            $p = ['username'=>$username];
            $stmt->execute($p);

            if($stmt->rowCount() == 0)
            {
                $sql = "insert into users (username, `password`) values(:username,:pass)";

                try{
                    $handle = $conn->prepare($sql);
                    $params = [
                        ':username'=>$username,
                        ':pass'=>$hashPassword
                    ];

                    $handle->execute($params);

                    $success = 'User has been created successfully';

                }
                catch(PDOException $e){
                    $errors[] = $e->getMessage();
                }
            }
            else
            {

                $valUsername = '';
                $valPassword = $password;

                $errors[] = 'Username already registered';
            }
        }
        else
        {
            $errors[] = "Email address is not valid";
        }
    }
    else
    {
        if(!isset($_POST['username']) || empty($_POST['username']))
        {
            $errors[] = 'valUsername is required';
        }
        else
        {
            $valUsername = $_POST['username'];
        }

        if(!isset($_POST['password']) || empty($_POST['password']))
        {
            $errors[] = 'Password is required';
        }
        else
        {
            $valPassword = $_POST['password'];
        }

    }

}
$conn = null;
?>


<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
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
<div class="container h-custom">
	<div class="row d-flex justify-content-center align-items-center">
    <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="../img/undraw_authentication_fsn5.svg" class="img-fluid"
          alt="Sample image">
    </div>
		<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
			<h1 class="display-4 mb-3" >Registreren</h1>
			<?php
				if(isset($errors) && count($errors) > 0)
				{
					foreach($errors as $error_msg)
					{
						echo '<div class="alert alert-danger">'.$error_msg.'</div>';
					}
                }

                if(isset($success))
                {

                    echo '<div class="alert alert-success">'.$success.'</div>';
                }
			?>
			<form method="POST" action="<?php echo $_SERVER['PHP_SELF'];?>">
          <div class="form-outline mb-4">
					       <label class="form-label" for="username">Username:</label>
					<input type="text" name="username" placeholder="Enter username" class="form-control bg-light form-control-lg" value="<?php echo ($valUsername??'')?>">
				</div>
				<div class="form-group">
				<label class="form-label" for="password">Password:</label>
					<input type="password" name="password" placeholder="Enter Password" class="form-control bg-light form-control-lg" value="<?php echo ($valPassword??'')?>">
				</div>
        <div class="mt-4 pt-2">
				<button type="submit" name="submit" class="btn btn-primary btn-lg">Verzenden</button>
      </div>

			</form>
		</div>
	</div>
</div>
</section>
</body>
</html>
