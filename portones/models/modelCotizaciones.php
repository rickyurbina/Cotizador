<?php

require_once 'conexion.php';

class CotizacionesModel {
  public static function mdlAgregarCotizacion($datosModel) {
    $statement = Conexion::conectar() -> prepare("INSERT INTO `cotizacionesPortones` VALUES (NULL, :porton, :cliente, :direccion, :codigoPostal, :RFC, now());");

    $statement -> bindParam(":porton", $datosModel["porton"], PDO::PARAM_STR);
    $statement -> bindParam(":cliente", $datosModel["cliente"], PDO::PARAM_STR);
    $statement -> bindParam(":direccion", $datosModel["direccion"], PDO::PARAM_STR);
    $statement -> bindParam(":codigoPostal", $datosModel["codigoPostal"], PDO::PARAM_STR);
    $statement -> bindParam(":RFC", $datosModel["RFC"], PDO::PARAM_STR);

    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }

  public static function mdlListarCotizaciones() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `cotizacionesPortones`;");

    $statement -> execute();
    
    return $statement -> fetchAll();
  }

  public static function mdlBuscarCotizacionPorId($idCotizacion) {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `cotizacionesPortones` WHERE `idCotizacion` = :idCotizacion;");

    $statement -> bindParam(":idCotizacion", $idCotizacion, PDO::PARAM_INT);
    $statement -> execute();

    return $statement -> fetch();
  }

  public static function mdlBuscarUltimaCotizacionId() {
    $statement = Conexion::conectar() -> prepare("SELECT MAX(`idCotizacion`) as id FROM `cotizacionesPortones`;");
    
    $statement -> execute();
    
    return $statement -> fetch();
  }

  public static function mdlBorrarCotizacion($idBorrar) {
    $statement = Conexion::conectar() -> prepare("DELETE FROM `cotizacionesPortones` WHERE `idCotizacion` = :idCotizacion;");
    $statement -> bindParam(':idCotizacion', $idBorrar, PDO::PARAM_INT);
    
    if ($statement -> execute()) {
      return 'success';
    } else {
      return 'error';
    }
  }
}
