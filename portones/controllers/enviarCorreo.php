<?php
require '../vendor/autoload.php';

require_once '../vendor/tecnickcom/tcpdf/tcpdf.php';

require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

if (isset($_POST['cuerpoCorreo'])) {
  $cuerpoCorreo = $_POST['cuerpoCorreo'];

  $PDF = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

  $PDF -> SetCreator(PDF_CREATOR);
  $PDF -> SetAuthor('Sky View Fenster');
  $PDF -> SetTitle('holi');
  $PDF -> SetSubject('Subject');
  $PDF -> SetKeywords('HOLA');

  $PDF -> setPrintHeader(false);
  $PDF -> setPrintFooter(false);

  $PDF -> SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  $PDF -> SetMargins(10, 10, 10);
  $PDF -> SetAutoPageBreak(true, 10);

  $tagvs = array(
    'p' => array(
      0 => array(
        'h' => 0, 
        'n' => 0), 
      1 => array(
        'h' => 0, 
        'n' => 0)
      ),
    'div' => array(
      0 => array(
        'h' => 0,
        'n' => 0),
      1 => array(
        'h' => 0,
        'n' => 0)
      )
    ); 
  $PDF -> setHtmlVSpace($tagvs);

  $PDF -> setImageScale(PDF_IMAGE_SCALE_RATIO);

  $PDF -> SetFont('helvetica', '', 12);

  $PDF -> AddPage();

  $PDF -> writeHTML($cuerpoCorreo, true, false, true, false, '');
  $PDF -> Output(__DIR__ . 'cotizacion.pdf', 'F');


  $recipient = $_POST["correo"];
  $subject = "Cotización de Sky View Fenster";

  $mail = new PHPMailer();

  $mail -> setFrom('info@skyviewfenster.com', 'Sky View Fenster');
  $mail -> addAddress($recipient);
  
  $mail -> isHTML(true);
  $mail -> CharSet = 'UTF-8';

  $mail -> Subject = $subject;
  $mail -> addAttachment(__DIR__ . "cotizacion.pdf", 'cotizacion.pdf');

  $mail -> Body = 'Le hacemos llegar la cotización que solicitó con nosotros. Quedamos a sus órdenaes para las dudas o correcciones necesarias. <br> Atte. Sky View Fenster <a href="https://skyviewfenster.com.mx/">/skyviewfenster.com.mx</a>. Este es un mensaje automático. Favor de no responder a este correo';
  $mail -> AltBody = 'Le hacemos llegar la cotización que solicitó con nosotros. Quedamos a sus órdenaes para las dudas o correcciones necesarias. Atte. Sky View Fenster. Este es un mensaje automático. Favor de no responder a este correo';

  if ($mail -> send()) {
    print_r("{ \"ok\": true }");
  } else {
    print_r("{\"ok\": false }");
  }
} else {
  print_r("{\"success\": false}");
}
