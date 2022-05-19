<?php

class PreciosController {
  public function ctrBuscarPrecio($descripcion) {
    $resultado = PreciosModel::mdlBuscarPrecio($descripcion);
    return $resultado;
  }

  public function ctrListarPrecios() {
    $precios = PreciosModel::mdlListarPrecios();
    $i = 0;
    foreach ($precios as $precio) {
      echo "
        <tr>
          <td class=\"descripcion\">" . $precio['descripcion'] . "</td>
          <td>
            <span id=\"span-" . $i . "\" class=\"spanTexto\" style=\"cursor: pointer;\" onclick=\"mostrarCajaPrecio('span-" . $i . "', 'caja-" . $i . "', " . $precio['id'] . ")\">
              " . $precio['precio'] . "
            </span>
            <input id=\"caja-" . $i . "\" type=\"number\" class=\"form-control texto\" style=\"display: none;\" value=\"" . $precio['precio'] . "\">
          </td>
        </tr>
      ";
    }
  }

  public function ctrEditarPrecio($datosController) {
    $resultado = PreciosModel::mdlEditarPrecio($datosController);
    return $resultado;
  }
}
