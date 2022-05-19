<?php

class CotizacionesController {
  public function ctrAgregarCotizacion($datosController) {
    $resultado = CotizacionesModel::mdlAgregarCotizacion($datosController);
    return $resultado;
  }

  public function ctrListarCotizaciones() {
    $cotizaciones = CotizacionesModel::mdlListarCotizaciones();
    
    foreach ($cotizaciones as $cotizacion) {
      $porton = json_decode($cotizacion["porton"], true);

      echo '
        <tr>
          <td>' . $cotizacion['cliente'] . '</td>
          <td>' . $cotizacion['fecha'] . '</td>
          <td>
            <button class="btn btn-success fas fa-eye" onclick="mirarCotizacion(' . $cotizacion['idCotizacion'] . ')"></button>
            <button class="btn btn-info fas fa-paper-plane" onclick="enviarPorCorreo(' . $cotizacion['idCotizacion']  . ')"></button>
            <button class="btn btn-secondary fas fa-print" onclick="generarPDF(' . $cotizacion['idCotizacion'] . ')"></button>
            <button class="btn btn-danger fas fa-trash" onclick="eliminarCotizacion(' . $cotizacion['idCotizacion'] . ')"></button>
          </td>
        </tr>
      ';
    }

    if (sizeof($cotizaciones) === 0) {
      echo '<tr>
        <td colspan="9" class="text-center">No se encontraron cotizaciones</td>
      </tr>';
    }
  }

  public function ctrBuscarCotizacionPorId($idCotizacion) {
    $resultado = CotizacionesModel::mdlBuscarCotizacionPorId($idCotizacion);
    return $resultado;
  }

  public function ctrBuscarUltimaCotizacionId() {
    $resultado = CotizacionesModel::mdlBuscarUltimaCotizacionId();
    return $resultado["id"];
  }

  public function ctrBorrarCotizacion() {
    if (isset($_GET['idBorrar'])) {
      $idBorrar = $_GET['idBorrar'];
      $resultado = CotizacionesModel::mdlBorrarCotizacion($idBorrar);

      if ($resultado === 'success') {
        echo "<script>
        Swal.fire({
          title: 'Cotización borrada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        }).then((value) => {
          window.location.href = 'inicio.php?action=lstCotizaciones';
        });
        </script>";
      } else {
        echo "<script>
        Swal.fire({
          title: 'Error al borrar la cotizacion',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        }).then((value) => {
          window.location.href = 'inicio.php?action=lstCotizaciones';
        });
        </script>";
      }
    }
  }
}