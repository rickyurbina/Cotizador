const rutaImagen = 'https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png';
function generarCuerpoCorreo (cotizacion) {
  let total = 0;
  
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  function generarPortones(portones) {
    let resultado = '';
    for (let i = 0; i < portones.length; i++) {
      const porton = portones[i];
      total += porton.totalDescuento;
      resultado += `
        <tr style="${i % 2 === 0 ? 'background-color: #DDDDDD' : '' }">
          <td style="font-size: 13px">${porton.tipo} - ${porton.figuras} - ${porton.instalacion ? 'Con instalación' : 'Sin instalación'}</td>
          <td style="font-size: 13px">${porton.apertura}</td>
          <td style="font-size: 13px">${porton.motor}</td>
          <td style="font-size: 13px">${porton.dimensiones.hueco.ancho}' x ${porton.dimensiones.hueco.alto}'</td>
          <td style="font-size: 13px">${porton.precio}</td>
          <td style="font-size: 13px">${porton.numeroPortones}</td>
          <td style="font-size: 13px">${porton.descuento}</td>
          <td style="font-size: 13px">${formatter.format(porton.totalDescuento)}</td>
        </tr>
      `;
    }
    return resultado;
  }


  let cuerpo = `
    <div style="border: 1px solid gray; text-align: center; font-family: helvetica">
      <span>Sky View Fenster</span>
      <br>
      <span>REKD820121H39</span>
      <div>
        <table style="width: 100%" style="padding-top: 10px">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: start;">
                <span style="font-family: helvetica; color: #2171FF; font-size: 22px; font-weight: bold">Cotización</span>
              </td>
              <td style="width: 50%;">
                <table style="width: 100%;">
                  <thead>
                    <tr>
                      <th></th>
                      <th style="background-color: #2171FF; width: 30%; text-align: center; color: white; font-weight: bold; font-size: 13px">Fecha</th>
                      <th style="background-color: #2171FF; width: 30%; text-align: center; color: white; font-weight: bold; font-size: 13px">Folio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>${cotizacion.fecha ? cotizacion.fecha : generarFecha()}</td>
                      <td>${cotizacion.idCotizacion}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%" style="padding-top: 2px; padding-bottom: 2px; font-size: 13px; border: 1px solid gray; font-weight: bold;">
                  <thead>
                    <tr>
                      <th style="background-color: #2171FF; width: 100%; text-align: center; color: white">Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align: left; font-weight: normal">${cotizacion.cliente}</td>
                    </tr>
                    <tr>
                      <td style="text-align: left; font-weight: normal">${cotizacion.direccion}</td>
                    </tr>
                    <tr>
                      <td style="text-align: left; font-weight: normal">${cotizacion.codigoPostal}</td>
                    </tr>
                    <tr>
                      <td style="text-align: left; font-weight: normal">${cotizacion.RFC}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <img src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big.png">
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <br>
                <table style="width: 100%">
                  <thead>
                    <tr>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Vigencia</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Condiciones</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Contado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td style="font-size: 13px">Contado</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <br>
                <table style="width: 100%">
                  <thead>
                    <tr>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Tipo</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Apertura</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Motor</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Dimensionesr</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Precio</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Cantidad</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Descuento</th>
                      <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${generarPortones(cotizacion.porton)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="border: 1px solid gray;">
        <table style="width: 100%;">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: start; font-size: 13px; width: 50%; height: 80px; padding: 4px">
                <div>
                  ${NumeroALetras(total * 1.16)[0].toUpperCase()}${NumeroALetras(total * 1.16).substr(1)}
                </div>
              </td>
              <td style="text-align: start; font-size: 13px; width: 25%">
                <p>Subtotal</p>
                <p>IVA</p>
                <br/>
                <p>Total</p>
              </td>
              <td style="text-align: right; font-size: 13px; width: 25%">
                <p>${formatter.format((total).toFixed(2))}</p>
                <p>${formatter.format((total * 0.16).toFixed(2))}</p>
                <br/>
                <p>${formatter.format((total * 1.16).toFixed(2))}</p>
              </td>
            </tr>
            <tr>
              <td colspan="3" style="font-size: 10px; text-align: left;">Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${formatter.format((total * 1.16).toFixed(2))}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hasta el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  return cuerpo;
}
