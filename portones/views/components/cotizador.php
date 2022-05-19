<div class="row w-100 mt-1">
  <div class="col-md-12 col-lg-8 col-12">
    <div class="multisteps-form">
      <!--progress bar-->
      <div class="row">
        <div class="col-12 col-lg-12 ml-auto mr-auto mb-4">
          <div id="multisteps-progress" class="multisteps-form__progress">

          </div>
        </div>
      </div>
      <!--form panels-->
      <div class="row">
        <div class="col-12 col-lg-11 m-auto">
          <div id="steps-container" class="multisteps-form__form">

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12 col-lg-4 col-12" style="margin-top: 4.3rem!important;">
    <div class="card">
      <div class="card-header border-0">
        <h4>Detalles</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr>
              <td style="width: 200px;" class="pl-3 pt-1 pb-1">Tipo</td>
              <td id="detailsContainerTipo" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Apertura</td>
              <td id="detailsContainerApertura" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Dimensiones del hueco</td>
              <td id="detailsContainerDimensionesHueco" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Dimensiones de instalación</td>
              <td id="detailsContainerDimensionesInstalacion" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Motor</td>
              <td id="detailsContainerMotor" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Color</td>
              <td id="detailsContainerColor" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Figuras</td>
              <td id="detailsContainerFiguras" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Instalación</td>
              <td id="detailsContainerInstalacion" class="pl-3 pt-1 pb-1"></td>
            </tr>
          </tbody>
        </table>
        <div class="row ml-3 mt-3">
          <div class="col-6 text-center"><h5>Total</h5></div> 
          <div class="col-6 text-center"><h5 id="totalCotizacion">$0</h5></div> 
        </div>
        <br>
        <div class="row" id="containerAddNumero" hidden>
          <div class="col-6">
            <input type="number" name="input-no-portones" min="1" max="10" id="input-no-portones" class="form-control" placeholder="No. de ventanas" value="1">
          </div>
          <div class="col-6">
            <button class="btn btn-block btn-primary" onclick="agregarCotizacion(rutaPorton)">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<br>
<div class="row justify-content-center">
  <div class="col">
    <div class="card">
      <div class="card-header border-0">
        <h4>Cotización</h4>
      </div>
      <div class="row mx-4 mt-4">
        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-sm-1">
          <input type="text" name="cajaNombreCliente" id="cajaNombreCliente" class="form-control" placeholder="Nombre del cliente">
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-sm-1">
          <input type="text" name="cajaDireccionCliente" id="cajaDireccionCliente" class="form-control" placeholder="Dirección del cliente">
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-sm-1">
          <input type="text" name="cajaCodigoPostalCliente" id="cajaCodigoPostalCliente" class="form-control" placeholder="Código postal del cliente">
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-sm-1">
          <input type="text" name="cajaRFCCliente" id="cajaRFCCliente" class="form-control" placeholder="RFC del cliente">
        </div>
      </div>
      <div class="card-body">
        <table class="table bg-white table-bordered table-hover">
          <thead>
            <th scope="col">Tipo</th>
            <th scope="col">Apertura</th>
            <th scope="col">Motor</th>
            <th scope="col">Dimensiones</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Descuento (%)</th>
            <th scope="col">Total</th>
            <th scope="col" class="text-center">Borrar</th>
          </thead>
          <tbody id="tablaCotizaciones">
            
          </tbody>
        </table>
        <div class="row d-flex flex-row-reverse">
          <div class="mr-4"><h5>Total: <b id="totalCotizaciones">$0</b></h5></div>
        </div>
        <div class="row" id="container-save-cotizacion" hidden>
          <div class="col-md-4 col-lg-4 col-xl-4 col-4">
            <button class="btn btn-block btn-primary" onclick="generarPDF(cotizaciones)"><i class="fas fa-print"></i>&nbsp;Generar PDF</button>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-4">
            <button class="btn btn-block btn-primary" onclick="enviarPorCorreo()"><i class="fas fa-paper"></i>&nbsp;Enviar cotización por correo</button>
          </div>
          <div class="col-4">
            <button class="btn btn-block btn-primary" onclick="guardarCotizacion()">Guardar cotización</button> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="./views/js/stepper.js"></script>
<script src="./views/js/generarPantallas.js"></script>
