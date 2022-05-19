<?php

require './controllerPrecios.php';
require '../models/modelPrecios.php';

$descripcion = $_POST['descripcion'];


$controllerPrecios = new PreciosController();
$resultado = $controllerPrecios -> ctrBuscarPrecio($descripcion);

echo json_encode($resultado);
