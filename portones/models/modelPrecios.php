<?php

require_once 'conexion.php';

class PreciosModel {
  public static function mdlBuscarPrecio($descripcion) {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `portones` WHERE `descripcion` = :descripcion;");

    $statement -> bindParam(":descripcion", $descripcion, PDO::PARAM_STR);

    $statement -> execute();
    return $statement -> fetch();
  }

  public static function mdlListarPrecios() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `portones`;");
    $statement -> execute();
    return $statement -> fetchAll();
  }

  public static function mdlEditarPrecio($datosModel) {
    $statement = Conexion::conectar() -> prepare("UPDATE `portones` SET `precio` = :precio WHERE `id` = :id");
    $statement -> bindParam(":precio", $datosModel["nuevoPrecio"], PDO::PARAM_STR);
    $statement -> bindParam(":id", $datosModel["id"], PDO::PARAM_STR);

    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }
}
