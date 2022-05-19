<?php
session_start();

if (!isset($_SESSION['nombre'])) {
  echo "<script>window.location.href = '';</script>";
}

require_once './controllers/controllerEnlaces.php';
require_once './models/modelEnlaces.php';

?>

<!DOCTYPE html>
<html lang="en">
<head dir="ltr">
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="author" content="U3Digital" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="favicon.ico" />
  
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="./lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="./lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="./views/css/styleStepper.css">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="./lib/vendor/datatables/jquery.dataTables.js"></script>
  <script src="./lib/vendor/datatables/dataTables.bootstrap4.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <link rel="stylesheet" href="./views/css/style.css" type="text/css" />

  <title>Cotizador</title>
</head>
<body>
  <div style="display: flex; flex-flow: column; height: 100vh;">
    <?php include './views/components/topbar.php' ?>
    <div style="display: flex; flex-grow: 1; flex-direction: row">
      <?php include './views/components/menu.php' ?>
      <div style="flex-grow: 1" class="m-4">
        <?php 
          $enlacesController = new EnlacesController(); 
          $enlacesController -> ctrEnlaces();
        ?>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
  <script src="views/js/generarCuerpoCorreo.js"></script>
  <script src="views/js/visualizaciones.js"></script>
  <script src="views/js/letras.js"></script>
  <script src="views/js/manejadorCotizaciones.js"></script>
  <script src="views/js/consultorPrecios.js"></script>
</body>
</html>
