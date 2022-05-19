<?php

require 'conexion.php';

class GeneralesModel {
  public static function mdlListarGenerales() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `generalesPortones`;");
    $statement -> execute();
    return $statement -> fetchAll();
  }

  public static function mdlActualizarCampo($datosModel) {
    $statement = Conexion::conectar() -> prepare("UPDATE `generalesPortones` SET `precio_dolar` = :precio_dolar, `incremento` = :incremento WHERE `id` = :id;");

    $statement -> bindParam(':precio_dolar', $datosModel['precioDolar'], PDO::PARAM_STR);
    $statement -> bindParam(':incremento', $datosModel['incremento'], PDO::PARAM_STR);
    $statement -> bindParam(':id', $datosModel['id'], PDO::PARAM_INT);

    if ($statement -> execute()) {
      return 'success';
    } else {
      return 'error';
    }
  }
}
