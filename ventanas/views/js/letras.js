function Unidades(num) {

  switch(num)
  {
      case 1: return 'ún';
      case 2: return 'dos';
      case 3: return 'tres';
      case 4: return 'cuatro';
      case 5: return 'cinco';
      case 6: return 'seis';
      case 7: return 'siete';
      case 8: return 'ocho';
      case 9: return 'nueve';
  }

  return '';
}//Unidades()

function Decenas(num){

  decena = Math.floor(num/10);
  unidad = num - (decena * 10);

  switch(decena)
  {
      case 1:
          switch(unidad)
          {
              case 0: return 'diez';
              case 1: return 'once';
              case 2: return 'doce';
              case 3: return 'trece';
              case 4: return 'catorce';
              case 5: return 'quince';
              default: return 'dieci' + Unidades(unidad);
          }
      case 2:
          switch(unidad)
          {
              case 0: return 'veinte';
              default: return 'veinti' + Unidades(unidad);
          }
      case 3: return DecenasY('treinta', unidad);
      case 4: return DecenasY('cuarenta', unidad);
      case 5: return DecenasY('cincuenta', unidad);
      case 6: return DecenasY('sesenta', unidad);
      case 7: return DecenasY('setenta', unidad);
      case 8: return DecenasY('ochenta', unidad);
      case 9: return DecenasY('noventa', unidad);
      case 0: return Unidades(unidad);
  }
}//Unidades()

function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
  return strSin + ' y ' + Unidades(numUnidades)

  return strSin;
}//DecenasY()

function Centenas(num) {
  centenas = Math.floor(num / 100);
  decenas = num - (centenas * 100);

  switch(centenas)
  {
      case 1:
          if (decenas > 0)
              return 'ciento ' + Decenas(decenas);
          return 'cient';
      case 2: return 'doscientos ' + Decenas(decenas);
      case 3: return 'trescientos ' + Decenas(decenas);
      case 4: return 'cuatrocientos ' + Decenas(decenas);
      case 5: return 'quinientos ' + Decenas(decenas);
      case 6: return 'seiscientos ' + Decenas(decenas);
      case 7: return 'setecientos ' + Decenas(decenas);
      case 8: return 'ochocientos ' + Decenas(decenas);
      case 9: return 'novecientos ' + Decenas(decenas);
  }

  return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  letras = '';

  if (cientos > 0)
      if (cientos > 1)
          letras = Centenas(cientos) + ' ' + strPlural;
      else
          letras = strSingular;

  if (resto > 0)
      letras += '';

  return letras;
}//Seccion()

function Miles(num) {
  divisor = 1000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMiles = Seccion(num, divisor, 'un mil', 'mil');
  strCentenas = Centenas(resto);

  if(strMiles == '')
      return strCentenas;

  return strMiles + ' ' + strCentenas;
}//Miles()

function Millones(num) {
  divisor = 1000000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMillones = Seccion(num, divisor, 'Un millón de', 'millones de');
  strMiles = Miles(resto);

  if(strMillones == '')
      return strMiles;

  return strMillones + ' ' + strMiles;
}//Millones()

function NumeroALetras(num) {
  const data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      letrasMonedaPlural: 'pesos',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: 'peso', //'PESO', 'Dólar', 'Bolivar', 'etc'

      letrasMonedaCentavoPlural: 'centavos',
      letrasMonedaCentavoSingular: 'centavo'
  };

  if (data.centavos > 0) {
      data.letrasCentavos = 'con ' + (function (){
          if (data.centavos == 1)
              return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
          else
              return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
          })();
  };

  if(data.enteros == 0)
      return 'cero ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  if (data.enteros == 1)
      return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
  else
      return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
}//NumeroALetras()
