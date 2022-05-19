<?php

class EnlacesModel {
  public static function mdlEnalces($enlaces) {
    $module = '';
    $listaEnlaces = ['agregarUsuario','lstUsuarios', 'lstCotizaciones', 'lstPrecios', 'lstGenerales', 'uptUsuario', 'salir'];

    if ($enlaces === '') {
      return './views/components/cotizador.php';
    } else if (in_array($enlaces, $listaEnlaces)) {
      $module = './views/components/' . $enlaces . '.php';
    }
    return $module;
  }
}