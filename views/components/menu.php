<div class="d-flex flex-column flex-shrink-0 p-3 bg-light menu" style="width: 280px;" style="flex: 1 1 auto;">
<hr style="border-top: 1px solid #DDDDDD; width: 95%">
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="/cotizador/ventanas/inicio.php" class="nav-link" aria-current="page">
        <i class="far fa-window-restore"></i>
        Cotizador Ventanas
      </a>
    </li>

    <li class="nav-item">
      <a href="/cotizador/portones/inicio.php" class="nav-link" aria-current="page">
        <i class="fas fa-door-open"></i>
        Cotizador Portones
      </a>
    </li>

    <?php
      if($_SESSION["rol"] == 0){
        echo '
        <hr style="border-top: 1px solid #DDDDDD; width: 95%">
        <li>
          <a href="inicio.php?action=agregarUsuario" class="nav-link link-dark">
          <i class="fas fa-user"></i>
            Agregar usuario
          </a>
        </li>
        <li>
          <a href="inicio.php?action=lstUsuarios" class="nav-link link-dark">
          <i class="fas fa-list"></i>
            Gestion de usuarios
          </a>
        </li>
        ';
      }
    ?>
    <hr style="border-top: 1px solid #DDDDDD; width: 95%">
    
  </ul>
</div>