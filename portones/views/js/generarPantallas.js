const pasos = [`<div class="d-flex text-center justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`, 
`<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`];

setSteps(['Tipo', 'Apertura', 'Dimensiones', 'Motor', 'Color', 'Figuras', 'Instalación']);
setLayouts(pasos);

generateStepper(0);

let cotizaciones = [];

const ruta = {
  tipo: '',
  subtipo: '',
  apertura: '',
  dimensiones: undefined,
  motor: '',
  color: '',
  instalacion: false
};

const detailsContainerTipo = document.getElementById('detailsContainerTipo');
const detailsContainerApertura = document.getElementById('detailsContainerApertura');
const detailsContainerDimensionesHueco = document.getElementById('detailsContainerDimensionesHueco');
const detailsContainerDimensionesInstalacion = document.getElementById('detailsContainerDimensionesInstalacion');
const detailsContainerMotor = document.getElementById('detailsContainerMotor');
const detailsContainerColor = document.getElementById('detailsContainerColor');
const detailsContainerFiguras = document.getElementById('detailsContainerFiguras');
const detailsContainerInstalacion = document.getElementById('detailsContainerInstalacion');
const etiquetaTotal = document.getElementById('totalCotizacion');

const containerAddNumero = document.getElementById('containerAddNumero');
const inputNumeroPortones = document.getElementById('input-no-portones');

let rutaPorton = Object.create(ruta);

let portonesObject = {};

let total = 0;

function cargarTipos(tipos) {
  let temporal = '<div class="row justify-content-center">';
  for (let i = 0; i < tipos.length; i++) {
    const tipo = tipos[i];
    temporal += `
    <div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarAperturas(${JSON.stringify(tipo)});'>
      <img src="${tipo.img}" alt="placeholder">
      <div class="my-2">
        <label class="form-check-label">${tipo.nombre}</label>
      </div>
    </div>`;
  }

  temporal += '</div>';
  pasos[0] = temporal;
  setLayouts(pasos);
  generateStepper(0);
}

// function cargarSubtipos(tipo) {
//   agregarARuta('tipo', tipo.nombre);
//   let temporal = '<div class="row justify-content-center">';
//   console.log(tipo);
//   for (let i = 0; i < tipo.subtipos.length; i++) {
//     const subtipo = tipo.subtipos[i];
//     temporal += 
//     `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarAperturas(${JSON.stringify(tipo)}, ${JSON.stringify(subtipo)});'>
//       <img src="${subtipo.img}" alt="placeholder">
//       <div class="my-2">
//         <label class="form-check-label">${subtipo.nombre}</label>
//       </div>
//     </div>`;
//   }
//   temporal += '</div>';
//   pasos[1] = temporal;
//   setLayouts(pasos);
//   generateStepper(1);
// }

function cargarAperturas(tipo) {
  agregarARuta('tipo', tipo.nombre);
  let temporal = '<div class="row justify-content-center">';
  for (let i = 0; i < tipo.aperturas.length; i++) {
    const apertura = tipo.aperturas[i];
    temporal +=
    `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarDimensionesHueco(${JSON.stringify(tipo)}, ${JSON.stringify(apertura)})'>
      <img src="${apertura.img}" alt="placeholder">
      <div class="my-2">
        <label class="form-check-label">${apertura.nombre}</label>
      </div>
    </div>`;
  }
  temporal += '</div>';
  pasos[1] = temporal;
  setLayouts(pasos);
  generateStepper(1);
}

let precioApertura = 0;

function cargarDimensionesHueco(tipo, apertura) {
  if (apertura.precio !== -1) {
    let precioIva = Number.parseFloat(apertura.precio);
    total = (100 * precioIva) / 116;
    console.log(total);
    precioApertura = total;
  
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });
  
    etiquetaTotal.innerText = formatter.format(total);
  }


  agregarARuta('apertura', apertura.nombre);
  let temporal = 
  `<div class="row">
    <div style="flex-grow: 1; flex-shrink: 0; display: flex; flex-direction: column;" class="p-2">
      <label>Medidas del hueco:</label>
      <div style="display: flex; mt-2 mb-2">
        <select id="selectDimensiones" class="form-control mr-1">
          <option value="">Ancho y alto</option>
          ${tipo.dimensiones.map((dimension) => (`<option value="${dimension.ancho}-${dimension.alto}">${dimension.ancho}' x ${dimension.alto}'</option>`))}
        </select>
      </div>
      <button class="btn btn-primary mt-2" onclick='cargarDimensionesInstalacion(${JSON.stringify(tipo)})'>Continuar</button>
    </div>
    <div id="formMedidasInstalacion" style="flex-grow: 1; display: flex; flex-direction: column;" class="p-2" hidden>
      <label>Medidas de instalación:</label>
      <div style="display: flex; mt-2 mb-2">
        <input id="cajaAnchoInstalacion" type="number" class="form-control mr-1" placeholder="Ancho">
        <input id="cajaAltoInstalacion" type="number" class="form-control ml-1" placeholder="Alto">
      </div>
      <button id="botonAceptarDimensiones" class="btn btn-primary mt-2">Aceptar</button>
    </div>
  </div>`;

  pasos[2] = temporal;
  setLayouts(pasos);
  generateStepper(2);

}

function cargarDimensionesInstalacion(tipo) {
  const selectDimensiones = document.getElementById('selectDimensiones');
  if (selectDimensiones.value) {
    console.log(selectDimensiones.value);
    
      const dimensiones = {
        hueco: {
          ancho: selectDimensiones.value.split('-')[0],
          alto: selectDimensiones.value.split('-')[1]
        }
      };

      document.getElementById('formMedidasInstalacion').hidden = false;

      document.getElementById('botonAceptarDimensiones').onclick = () => {

        const cajaAncho = document.getElementById('cajaAnchoInstalacion');
        const cajaAlto = document.getElementById('cajaAltoInstalacion');

        if (cajaAncho.value && cajaAlto.value) {
          dimensiones.instalacion = {
            ancho: cajaAncho.value,
            alto: cajaAlto.value
          };
          // TODO: Preguntar por los rieles 
          if (tipo.nombre !== 'Residencial') {
            rutaPorton.riel = tipo.dimensiones.riel;
          }

          cargarMotores(tipo, dimensiones);

        } else {
          Swal.fire({
            title: 'Indique unas dimensiones',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007BFF'
          });
        }

      }

  } else {
    Swal.fire({
      title: 'Seleccione unas dimensiones',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#007BFF'
    });
  }
}

function cargarMotores(tipo, dimensiones) {
  agregarARuta('dimensiones', dimensiones);
  const motores = tipo.motores;
  
  let temporal = '<div class="row justify-content-center">';
  for (let i = 0; i < tipo.motores.length; i++) {
    const motor = motores[i];
    temporal += 
    `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarColores(${JSON.stringify(tipo)}, ${JSON.stringify(motor)})'>
      <img src="${motor.img}" alt="placeholder">
      <div class="my-2">
        <label class="form-check-label">${motor.nombre}${motor.hasQuote ? '&apos;' : ''}</label>
      </div>
    </div>
    `;
  }
  temporal += '</div>';
  pasos[3] = temporal;
  setLayouts(pasos);
  generateStepper(3);
}

let precioMotor = 0;

function cargarColores(tipo, motor) {
  consultarPrecio(motor.nombre.replaceAll(' ', '-')).then((response) => response.json()).then((data) => {
    
    total = precioApertura;
    
    let precioIva = Number.parseFloat(data.precio);
    precioMotor = (100 * precioIva) / 116;
    total += (100 * precioIva) / 116;

    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });

    etiquetaTotal.innerText = formatter.format(total);
  });

  agregarARuta('motor', motor.nombre);
  const colores = tipo.colores;
  let temporal = '<div class="row justify-content-center">';
  for (let i = 0; i < colores.length; i++) {
    const color = colores[i];
    temporal += 
    `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarFiguras(${JSON.stringify(tipo)}, ${JSON.stringify(color)})'>
      <img src="${color.img}" alt="placeholder">
      <div class="my-2">
        <label class="form-check-label">${color.nombre}</label>
      </div>
    </div>
    `;
  }
  temporal += '</div>';
  pasos[4] = temporal;
  setLayouts(pasos);
  generateStepper(4);
}

function cargarFiguras(tipo, color) {
  agregarARuta('color', color.nombre);
  const subtipos = tipo.subtipos;
  let temporal = '<div class="row justify-content-center">';
  if (tipo.nombre === 'Residencial') {
    for (let i = 0; i < subtipos.length; i++) {
      const subtipo = subtipos[i];
      temporal +=
      `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarInstalacion(${JSON.stringify(tipo)}, ${JSON.stringify(subtipo)})'>
        <img src="${subtipo.img}" alt="placeholder">
        <div class="my-2">
          <label class="form-check-label">${subtipo.nombre}</label>
        </div>
      </div>`;
    }
  } else {
    indice = buscarRiel(tipo);
    temporal += 
    `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarInstalacion(${JSON.stringify(tipo)}, ${JSON.stringify(tipo.subtipos[indice])})'>
      <img src="${tipo.subtipos[indice].img}" alt="placeholder">
      <div class="my-2">
        <label class="form-check-label">${tipo.subtipos[indice].nombre}</label>
      </div>
    </div>`;
  }
  
  temporal += '</div>';
  pasos[5] = temporal;
  setLayouts(pasos);
  generateStepper(5);
}

function buscarRiel(tipo) {

  for (let i = 0; i < tipo.dimensiones.length; i++) {
    const dimension = tipo.dimensiones[i];
    if (rutaPorton.dimensiones.hueco.ancho == dimension.ancho && rutaPorton.dimensiones.hueco.alto == dimension.alto) {
      return dimension.riel === 2 ? 0 : 1;
    }
  }
}

function cargarInstalacion(tipo, figuras) {

  let descripcion = ''

  if (tipo.nombre === 'Residencial') {
    descripcion = `${figuras.nombre.replaceAll(' ', '-')}-${rutaPorton.dimensiones.hueco.ancho}x${rutaPorton.dimensiones.hueco.alto}`;
  } else {
    descripcion = `Porton-Comercial-${figuras.nombre.split("\"")[0].replaceAll(' ', '-')}-${rutaPorton.dimensiones.hueco.ancho}x${rutaPorton.dimensiones.hueco.alto}`;
  }

  consultarPrecio(descripcion).then((response) => response.json()).then((data) => {
    total = precioApertura + precioMotor;
    let precioIva = Number.parseFloat(data.precio);
    total += (100 * precioIva) / 116;

    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });

    etiquetaTotal.innerText = formatter.format(total);
  });

  agregarARuta('figuras', figuras.nombre);
  agregarARuta('instalacion', false);
  let temporal = 
  `<div class="d-flex justify-content-center text-center" style="flex-direction: column;">
    ¿Incluir la instalación?
    <input type="checkbox" style="margin-left: auto; margin-right: auto; margin-top: 1em;" onclick="agregarARuta('instalacion', event.target.checked)">
  </div>`;

  pasos[6] = temporal;
  setLayouts(pasos);
  generateStepper(6);
}

function agregarARuta(llave, valor) {
  switch (llave) {
    case 'tipo':
      if (rutaPorton.tipo) {
        delete rutaPorton.tipo;
        delete rutaPorton.subtipo;
        delete rutaPorton.apertura;
        delete rutaPorton.dimensiones;
        delete rutaPorton.motor;
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;
        
        detailsContainerTipo.innerHTML = `Aún no se selecciona un tipo`;          
        detailsContainerApertura.innerHTML = `Aún no se selecciona una apertura`;        
        detailsContainerDimensionesHueco.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerDimensionesInstalacion.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerMotor.innerHTML = `Aún no se selecciona un motor`;
        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
      
        for (let i = 2; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores.</p>`;
        }
      }

      rutaPorton.tipo = valor;
      detailsContainerTipo.innerHTML = valor;
      break;

    case 'subtipo':
      if (rutaPorton.subtipo) {
        delete rutaPorton.subtipo;
        delete rutaPorton.apertura;
        delete rutaPorton.dimensiones;
        delete rutaPorton.motor;
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerApertura.innerHTML = `Aún no se selecciona una apertura`;        
        detailsContainerDimensionesHueco.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerDimensionesInstalacion.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerMotor.innerHTML = `Aún no se selecciona un motor`;
        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
      
        for (let i = 3; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        }
      }

      rutaPorton.subtipo = valor;
      detailsContainerSubtipo.innerText = valor;
      break;

    case 'apertura':
      if (rutaPorton.apertura) {
        delete rutaPorton.apertura;
        delete rutaPorton.dimensiones;
        delete rutaPorton.motor;
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerApertura.innerHTML = `Aún no se selecciona una apertura`;        
        detailsContainerDimensionesHueco.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerDimensionesInstalacion.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerMotor.innerHTML = `Aún no se selecciona un motor`;
        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
      
        for (let i = 4; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        }
      }
      
      rutaPorton.apertura = valor;
      detailsContainerApertura.innerText = valor;
      break;

    case 'dimensiones':
      if (rutaPorton.dimensiones) {
        delete rutaPorton.dimensiones;
        delete rutaPorton.motor;
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerDimensionesHueco.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerDimensionesInstalacion.innerHTML = `Aún no se asignan dimensiones`;
        detailsContainerMotor.innerHTML = `Aún no se selecciona un motor`;
        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
        
        for (let i = 5; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        }
      }

      rutaPorton.dimensiones = valor;
      detailsContainerDimensionesHueco.innerText = `${valor.hueco.ancho}' x ${valor.hueco.alto}'`;
      detailsContainerDimensionesInstalacion.innerText = `${valor.instalacion.ancho}" x ${valor.instalacion.alto}"`;
      break;

    case 'motor':
      if (rutaPorton.motor) {
        delete rutaPorton.motor;
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerMotor.innerHTML = `Aún no se selecciona un motor`;
        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
        
        for (let i = 6; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        }
      }
      rutaPorton.motor = valor;
      detailsContainerMotor.innerText = valor;
      break;

    case 'color':
      if (rutaPorton.color) {
        delete rutaPorton.color;
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
        
        for (let i = 7; i < 9; i++) {
          pasos[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        }
      }
      rutaPorton.color = valor;
      detailsContainerColor.innerText = valor;
      break;   
    case 'figuras':
      if (rutaPorton.figuras) {
        delete rutaPorton.figuras;
        delete rutaPorton.instalacion;

        containerAddNumero.hidden = true;

        detailsContainerFiguras.innerHTML = `Aún no se asignan figuras`;
        detailsContainerInstalacion.innerHTML = `Aún no se selecciona instalación`;
        
        pasos[8] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
        
      }
      rutaPorton.figuras = valor;
      detailsContainerFiguras.innerText = valor;
      containerAddNumero.hidden = false;

      break;
    case 'instalacion':
      if (rutaPorton.instalacion) {
        delete rutaPorton.instalacion;
      }

      rutaPorton.instalacion = valor;
      detailsContainerInstalacion.innerText = valor ? 'Sí' : 'No';
      break;

    default:
      break;
  }
}

function requestPortonesListener() {
  const t0 = performance.now();
  portonesObject = JSON.parse(this.responseText);
  const t1 = performance.now() - t0;

  console.log(`${t1}ms`);

  cargarTipos(portonesObject.tipos);
}

const requestPortones = new XMLHttpRequest();
requestPortones.addEventListener('load', requestPortonesListener);
requestPortones.open('GET', './views/js/portones.json');
requestPortones.send();
