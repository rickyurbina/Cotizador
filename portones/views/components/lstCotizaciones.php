<?php
require_once './controllers/controllerCotizaciones.php';
require_once './models/modelCotizaciones.php';
?>

<div class="row justify-content-center">
  <div class="col">
    <div class="card">
      <div class="card-header border-0">
        <h4>Cotizaciones</h4>
      </div>
      <div class="card-body">
        <table class="table bg-white table-bordered table-hover">
          <thead>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </thead>
          <tbody>
            <?php
              $controllerCotizaciones = new CotizacionesController();
              $controllerCotizaciones -> ctrListarCotizaciones();
              $controllerCotizaciones -> ctrBorrarCotizacion();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>