<?php

class Conexion {
  public static function conectar() {

    // $servername = "mysql1007.mochahost.com";
    // $username = "rickurbi_skyview";
    // $password = "NmAIt&jZ2dd1";
    // $dbname = "rickurbi_skyview";

    $servername = "localhost";
    $username = "root";
    $password = "12345678";
    $dbname = "cotizador";
    

    try {
      $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

      $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $exception) {
      print_r($exception);
    }
    return $conexion;
  }
}
