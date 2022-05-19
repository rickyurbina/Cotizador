<?php

require './controllerCotizaciones.php';
require '../models/modelCotizaciones.php';

$datosController = array(
  'porton' => $_POST['portones'],
  'cliente' => $_POST['cliente'],
  'direccion' => $_POST['direccion'],
  'codigoPostal' => $_POST['codigoPostal'],
  'RFC' => $_POST['RFC']
);

$controller = new CotizacionesController();
$respuesta = $controller -> ctrAgregarCotizacion($datosController);

if ($respuesta === "success") {
  print_r("{ \"ok\": true }");
} else {
  print_r("{ \"ok\": true }");
}
