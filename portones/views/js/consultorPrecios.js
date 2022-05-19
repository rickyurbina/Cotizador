function consultarPrecio(descripcion) {
  console.log(descripcion);
  const formData = new FormData();
  formData.set('descripcion', descripcion);

  return fetch('./controllers/consultarPrecio.php', {
    method: 'POST',
    body: formData
  });
}

// consultarPrecio('Sencillo Cuadrado-510-8x7').then((response) => response.json()).then((data) => {
//   console.log('finiquitao');
// });

// console.log('siguiente');