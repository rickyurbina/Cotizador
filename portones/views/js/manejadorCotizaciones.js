
function agregarCotizacion(cotizacion) {

  rutaPorton.numeroPortones = inputNumeroPortones.value;
  rutaPorton.precio = total; 
  rutaPorton.total = rutaPorton.numeroPortones * rutaPorton.precio;
  rutaPorton.total = Number.parseFloat(rutaPorton.total.toFixed(2));
  rutaPorton.descuento = 0;
  rutaPorton.totalDescuento = rutaPorton.total;


  cotizaciones.push(cotizacion);
  cargarTabla();
  limpiarCotizador();
}

function cargarTabla() {

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  const tabla = document.getElementById('tablaCotizaciones');
  let tablaHTML = '';

  for (let i = 0; i < cotizaciones.length; i++) {
    const cotizacion = cotizaciones[i];
    tablaHTML += 
    `<tr>
      <td>${cotizacion.tipo} - ${cotizacion.figuras} - ${cotizacion.instalacion ? 'Con instalación' : 'Sin instalación'}</td>
      <td>${cotizacion.apertura}</td>
      <td>${cotizacion.motor}</td>
      <td>${cotizacion.dimensiones.hueco.ancho}' x ${cotizacion.dimensiones.instalacion.alto}'</td>
      <td>${formatter.format(cotizacion.precio)}</td>
      <td>
        <input id="cantidad-${i}" type="number" value="${cotizacion.numeroPortones ? cotizacion.numeroPortones : 1}" class="form-control" onchange="cambiarCantidadDeIndex(event)" onkeyup="cambiarCantidadDeIndex(event)">
      </td>
      <td>
        <input id="descuento-${i}" type="number" value="0" onchange="cambiarDescuentoDeIndex(event)" onkeyup="cambiarDescuentoDeIndex(event)" step="0.01" class="form-control">
      </td>
      <td id="total-${i}">${formatter.format(cotizacion.total)}</td>
      <td>
        <button onclick="borrarCotizacion(${i})" class="btn btn-danger fas fa-trash"></button>
      </td>
    </tr>
    `;
  }
  recalcularTotal();
  tabla.innerHTML = tablaHTML;
}

function cambiarCantidadDeIndex(event) {
  const index = event.target.id.split('-')[1];
  const value = event.target.value;

  if (value.includes('.')) {
    event.target.value = value.split('.')[0];
  }

  if (value) {
    if (value > 0) {
      cotizaciones[index].numeroPortones = value;
    } else {
      cotizaciones[index].numeroPortones = 1;
      event.target.value = 1;
    }
    calcularTotalDeCotizacion(index);
  }
}

function cambiarDescuentoDeIndex(event) {
  const index = event.target.id.split('-')[1];
  const value = event.target.value;

  if (!value) {
    event.target.value = 0;
  }

  if (value > 100) {
    event.target.value = 100;
  } else if (value < 0) {
    event.target.value = 0;
  }

  if (value) {
    cotizaciones[index].descuento = value;
    calcularTotalDeCotizacion(index);
  }
}

function calcularTotalDeCotizacion(index) {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  cotizaciones[index].totalDescuento = (cotizaciones[index].numeroPortones * cotizaciones[index].precio);
  cotizaciones[index].totalDescuento = cotizaciones[index].totalDescuento - (cotizaciones[index].totalDescuento * cotizaciones[index].descuento) / 100;

  document.getElementById(`total-${index}`).innerHTML = formatter.format(cotizaciones[index].totalDescuento);
  recalcularTotal();
}

function recalcularTotal() {
  let t = 0;
  for (let i = 0; i < cotizaciones.length; i++) {
    t += cotizaciones[i].totalDescuento;
  }

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  document.getElementById('totalCotizaciones').innerHTML = `${formatter.format(t)}`;
}

function borrarCotizacion(index) {
  cotizaciones.splice(index, 1);
  cargarTabla();
}

function eliminarCotizacion(idCotizacion) {
  Swal.fire({
    title: '¿Está seguro de que desea borrar esta cotización?',
    text: 'Esta acción no podrá ser revertida',
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#007BFF'
  }).then((value) => {
    if (value.isConfirmed) {
      window.location.href = `inicio.php?action=lstCotizaciones&idBorrar=${idCotizacion}`;
    }
  });
}

function limpiarCotizador() {
  total = 0;
  
  const containerSaveCotizacion = document.getElementById('container-save-cotizacion');
  containerSaveCotizacion.hidden = false;

  rutaPorton = Object.create(ruta);

  containerAddNumero.hidden = true;

  etiquetaTotal.innerText = '$0';

  detailsContainerTipo.innerText = '';
  detailsContainerApertura.innerText = '';
  detailsContainerDimensionesHueco.innerText = '';
  detailsContainerDimensionesInstalacion.innerText = '';
  detailsContainerMotor.innerText = '';
  detailsContainerColor.innerText = '';
  detailsContainerFiguras.innerText = '';
  detailsContainerInstalacion.innerText = '';
  
  for (let i = 1; i < 9; i++) {
    pasos[i] = '<p>Para mostrar este paso es necesario que completes los pasos anteriores.</p>';
  }

  inputNumeroPortones.value = 1;

  setLayouts(pasos);
  generateStepper(0);
}

async function generarPDF(cotizacion) {

  let html = '';
  if (typeof cotizacion === 'number') {
    const formData = new FormData();
    formData.set('idCotizacion', cotizacion);

    await fetch('./controllers/buscarCotizacion.php', {
      method: 'POST',
      body: formData
    }).then((response) => response.json()).then((data) => {
      html = generarVisualizacion(data);
    });

  } else {
    const cajaNombre = document.getElementById('cajaNombreCliente');
    const cajaDireccion = document.getElementById('cajaDireccionCliente');
    const cajaCodigoPostal = document.getElementById('cajaCodigoPostalCliente');
    const cajaRFC = document.getElementById('cajaRFCCliente');

    if (cajaNombre.value && cajaDireccion.value && cajaCodigoPostal.value && cajaRFC.value) {
      const nombre = cajaNombre.value;
      const direccion = cajaDireccion.value;
      const codigoPostal = cajaCodigoPostal.value;
      const RFC = cajaRFC.value;

      const folio = await ( await fetch('./controllers/buscarUltimaCotizacion.php', {
        method: 'GET'
      })).json();
      
      const objeto = {
        cliente: nombre,
        direccion,
        codigoPostal,
        RFC,
        idCotizacion: folio.id + 1,
        porton: cotizacion
      };

      html = generarVisualizacion(objeto);

    } else {
      Swal.fire({
        title: 'Error',
        text: 'Rellene los campos necesarios',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      });
      return;
    }
  }

  // const html = generarVisualizacion();
  const ventana = window.open('', 'Cotizacion', `width=${window.innerWidth - 200}, height=${window.innerHeight - 100}`);
  ventana.document.write(html);
  ventana.document.close();
  ventana.onload = () => {
    setTimeout(() => {
      ventana.print();
    }, 300);
  };

  ventana.addEventListener('afterprint', () => {
    ventana.close();
  });
}

async function enviarPorCorreo(cotizacion) {

  if (typeof cotizacion === 'number') {
    const formData = new FormData();
    formData.set('idCotizacion', cotizacion);

    await fetch('./controllers/buscarCotizacion.php', {
      method: 'POST',
      body: formData
    }).then((response) => response.json()).then((data) => {
      html = generarCuerpoCorreo(data);
    });

    Swal.fire({
      title: 'Correo del cliente',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#007bff',
      cancelButtonText: 'Cancelar',
      preConfirm: (correo) => {
        
        const formData = new FormData();
        formData.set('correo', correo);
        formData.set('cuerpoCorreo', html);

        fetch('./controllers/enviarCorreo.php', {
          method: 'POST',
          body: formData
        }).then((response) => response.json()).then((data) => {
          if (data.ok) {
            Swal.fire({
              title: 'Correo enviado exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          } else {
            Swal.fire({
              title: 'Error al enviar el correo',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          }
        });
      }
    });

  } else {
    if (cotizaciones.length > 0) {

      const cajaNombre = document.getElementById('cajaNombreCliente');
      const cajaDireccion = document.getElementById('cajaDireccionCliente');
      const cajaCodigoPostal = document.getElementById('cajaCodigoPostalCliente');
      const cajaRFC = document.getElementById('cajaRFCCliente');
    
      if (cajaNombre.value && cajaDireccion.value && cajaCodigoPostal.value && cajaRFC.value) {
        const nombre = cajaNombre.value;
        const direccion = cajaDireccion.value;
        const codigoPostal = cajaCodigoPostal.value;
        const RFC = cajaRFC.value;
    
        const folio = await ( await fetch ('./controllers/buscarUltimaCotizacion.php', {
          method: 'GET'
        })).json();
      
        Swal.fire({
          title: 'Correo del cliente',
          input: 'email',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Enviar',
          confirmButtonColor: '#007bff',
          cancelButtonText: 'Cancelar',
          preConfirm: (correo) => {
            const cotizacion = {
              cliente: nombre,
              direccion,
              codigoPostal,
              RFC,
              fecha: generarFecha(),
              porton: cotizaciones,
              idCotizacion: folio.id + 1
            };
    
            const cuerpoCorreo = generarCuerpoCorreo(cotizacion);
            
            const formData = new FormData();
            formData.set('correo', correo);
            formData.set('cuerpoCorreo', cuerpoCorreo);
    
            fetch('./controllers/enviarCorreo.php', {
              method: 'POST',
              body: formData
            }).then((response) => response.json()).then((data) => {
              if (data.ok) {
                Swal.fire({
                  title: 'Correo enviado exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#007BFF'
                });
              } else {
                Swal.fire({
                  title: 'Error al enviar el correo',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#007BFF'
                });
              }
            });
          }
        });
    
      } else {
        Swal.fire({
          title: 'Rellene los datos faltantes',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#007bff'
        });
      }
    } else {
      Swal.fire({
        title: 'No hay ninguna cotización para enviar',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      });
    }
  }
}

function guardarCotizacion() {

  const cajaNombre = document.getElementById('cajaNombreCliente');
  const cajaDireccion = document.getElementById('cajaDireccionCliente');
  const cajaCodigoPostal = document.getElementById('cajaCodigoPostalCliente');
  const cajaRFC = document.getElementById('cajaRFCCliente');

  if (cajaNombre.value && cajaDireccion.value && cajaCodigoPostal.value && cajaRFC.value) {
    const nombre = cajaNombre.value;
    const direccion = cajaDireccion.value;
    const codigoPostal = cajaCodigoPostal.value;
    const RFC = cajaRFC.value;

    const formData = new FormData();

    formData.set('cliente', nombre);
    formData.set('direccion', direccion);
    formData.set('codigoPostal', codigoPostal);
    formData.set('RFC', RFC);
    formData.set('portones', JSON.stringify(cotizaciones));

    fetch('./controllers/agregarCotizacion.php', {
      method: 'POST',
      body: formData
    }).then((response) => response.json()).then((data) => {
      if (data.ok) {
        Swal.fire({
          title: 'Cotización guardardada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#007bff'
        });
        
        limpiarCotizador();
        cotizaciones = [];
        cargarTabla();
      } else {
        Swal.fire({
          title: 'Error al guardar la cotización',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#007bff'
        });
      }
    });

  } else {
    Swal.fire({
      title: 'Error',
      text: 'Rellene los campos necesarios',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#007bff'
    });
  }
}
