<?php

require './controllerCotizaciones.php';
require '../models/modelCotizaciones.php';

$controller = new CotizacionesController();
$respuesta = $controller -> ctrBuscarUltimaCotizacionId();

if ($respuesta) {
  print_r("{ \"id\": $respuesta }");
} else {
  print_r("{ \"id\": 0 }");
}
