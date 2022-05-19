function generarVisualizacion(cotizacion) {
  let totalCotizacion = 0;
  if (typeof cotizacion.porton === 'string') {
    cotizacion.porton = JSON.parse(cotizacion.porton);
  }
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  const estilo = `
    <style>
      * {
        font-family: Arial;
      }

      .flex {
        display: flex;
      }

      .flex-col {
        flex-direction: column;
      }

      .flex-row-reverse {
        flex-direction: row-reverse;
      }

      .justify-center {
        justify-content: center;
      }

      .items-center {
        align-items: center;
      }

      .text-center {
        text-align: center;
      }

      .block {
        display: block;
      }

      .border {
        border: 1px solid gray;
      }

      .borde {
        border: 1px solid red;
      }

      @page {
        size: auto;
        margin: 5mm;
      }

      @media print {
        * {
          -webkit-print-color-adjust: exact;
        }

        .footer {
          position: static;
          bottom: 20px;
          left: 0px;
          width: 100%;
        }
      }

    </style>
  `;

  function generarPortones(portones) {
    let html = '';
    
   for (let i = 0; i < portones.length; i++) {
      const porton = portones[i];
      totalCotizacion += porton.totalDescuento;

      html += `
      <tr style="font-size: 14px">
        <td class="text-center">${porton.tipo} - ${porton.figuras} - ${porton.instalacion ? 'Con instalación' : 'Sin instalación' } </td>
        <td class="text-center">${porton.apertura}</td>
        <td class="text-center">${porton.motor}</td>
        <td class="text-center">${porton.dimensiones.hueco.ancho} - ${porton.dimensiones.hueco.alto}</td>
        <td class="text-center">${porton.precio}</td>
        <td class="text-center">${porton.numeroPortones}</td>
        <td class="text-center">${porton.descuento}</td>
        <td class="text-center">${formatter.format(porton.totalDescuento)}</td>
      </tr>`;
    }

    return html;
  }

  return `
    ${estilo}
    <body style="position: relative; margin: 2em;" class="border">
      <div>
        <table style="width: 100%; margin-bottom: 20px">
          <thead>
            <tr>
              <td>
                <div class="flex justify-center flex-col items-center">
                  <span style="font-size: 16px">Sky View Fenster</span>
                  <span><small>REKD820121H39</small></span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="flex">
                  <div class="flex flex-col" style="width: 50%">
                    <span style="font-size: 22px; font-weight: bolder; color: #2171FF; margin-bottom: 1em">Cotización</span>
                    <table class="border">
                      <thead style="background-color: #2171FF;">
                        <tr>
                          <th>
                            <div style="color: white; padding-top: 2px; padding-bottom: 2px">Cliente</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${cotizacion.cliente}</td>
                        </tr>
                        <tr>
                          <td>${cotizacion.direccion}</td>
                        </tr>
                        <tr>
                          <td>${cotizacion.codigoPostal}</td>
                        </tr>
                        <tr>
                          <td>${cotizacion.RFC}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="flex flex-col" style="width: 50%">
                    <div class="flex flex-row-reverse">
                      <table style="width: 66%">
                        <thead>
                          <tr style="background-color: #2171FF;">
                            <th style="color: white; padding-top: 2px; padding: 4px">Fecha</th>
                            <th style="color: white; padding-top: 2px; padding: 4px">Folio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-center">${cotizacion.fecha ? cotizacion.fecha : generarFecha()}</td>
                            <td class="text-center">${cotizacion.idCotizacion}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style="margin-bottom: auto; padding: 1em;">
                      <img src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big.png" style="width: 100%;">
                    </div>
                  </div>
                </div>
                <div style="margin-top: 1em">
                  <table style="width: 100%">
                    <thead>
                      <tr>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Vigencia
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Condiciones
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Vendedor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td class="text-center">Contado</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <br>
                  <table style="width: 100%">
                    <thead>
                      <tr>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Tipo
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Apertura
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Motor
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Dimensiones
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Precio
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Cantidad
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Descuento
                        </th>
                        <th style="background-color: #2171FF; color: white; padding: 4px">
                          Importe
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${generarPortones(cotizacion.porton)}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer flex flex-col">
        <div class="flex">
          <div class="border" style="width: 60%; font-size: 14px; padding: 1em; word-wrap: break-word;">${NumeroALetras(totalCotizacion * 1.16)[0].toUpperCase()}${NumeroALetras(totalCotizacion * 1.16).substr(1)}</div>
          <div class="border flex flex-col" style="width: 20%; padding: 1em;">
            <span>Subtotal</span>
            <span>IVA</span>
            <br>
            <span>Total</span>
          </div>
          <div class="border flex flex-col" style="width: 20%; padding: 1em; align-items: end">
            <span style="margin-left: auto">${formatter.format((totalCotizacion).toFixed(2))}</span>
            <span style="margin-left: auto">${formatter.format((totalCotizacion * 0.16).toFixed(2))}</span>
            <br>
            <span style="margin-left: auto"><b>${formatter.format((totalCotizacion * 1.16).toFixed(2))}</b></span>
          </div>
        </div>
        <div class="border" style="font-size: 12px; word-wrap: break-word; padding: 1em">
          Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${formatter.format((totalCotizacion * 1.16).toFixed(2))}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hasta el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.
        </div>
      </div>
    </body>
  `;
}

function generarFecha() {
  const fecha = new Date(Date.now());

  let fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? '0' : ''}${fecha.getMonth() + 1}-${fecha.getDate() < 10 ? '0': '' }${fecha.getDate()}`;
        
  return fechaFormateada;
}

async function mirarCotizacion(idCotizacion) {
  const formData = new FormData();
  formData.set('idCotizacion', idCotizacion);

  await fetch('./controllers/buscarCotizacion.php', {
    method: 'POST',
    body: formData
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    const html = generarVisualizacion(data);

    const ventana = window.open('', 'Cotizacion', `width=${window.innerWidth - 200}, height=${window.innerHeight - 100}`);
    ventana.document.write(html);
    ventana.document.close();
    
  });
}
