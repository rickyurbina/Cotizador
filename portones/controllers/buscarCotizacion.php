<?php
require './controllerCotizaciones.php';
require '../models/modelCotizaciones.php';

$idCotizacion = $_POST['idCotizacion'];

$controller = new CotizacionesController();
$respuesta = $controller -> ctrBuscarCotizacionPorId($idCotizacion);
print_r(json_encode($respuesta));
