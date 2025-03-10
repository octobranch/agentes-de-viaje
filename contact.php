<?php
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validación reCAPTCHA
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = 'TU_SECRET_KEY';
    $recaptcha_response = $_POST['recaptcha_response'];
    
    $recaptcha = file_get_contents($recaptcha_url.'?secret='.$recaptcha_secret.'&response='.$recaptcha_response);
    $recaptcha = json_decode($recaptcha);
    
    if ($recaptcha->score < 0.5) {
        header('Location: error.html?codigo=spam');
        exit;
    }

    // Configuración PHPMailer con SMTP
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.tudominio.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'correo@tudominio.com';
        $mail->Password = 'tu_password_seguro';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        
        $mail->setFrom('no-reply@harmoniatours.com', 'Harmonia Tours');
        $mail->addAddress('contacto@harmoniatours.com');
        $mail->addReplyTo($_POST['email'], $_POST['nombre']);
        
        $mail->isHTML(true);
        $mail->Subject = "Nueva Consulta: " . htmlspecialchars($_POST['nombre']);
        $mail->Body = "
            <h2>Detalles de la Consulta</h2>
            <p><strong>Nombre:</strong> " . htmlspecialchars($_POST['nombre']) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>
            <p><strong>Mensaje:</strong></p>
            <p>" . nl2br(htmlspecialchars($_POST['mensaje'])) . "</p>
        ";
        
        $mail->send();
        header('Location: gracias.html');
    } catch (Exception $e) {
        error_log("Error de correo: " . $mail->ErrorInfo);
        header('Location: error.html?codigo=servidor');
    }
} else {
    header("HTTP/1.1 403 Forbidden");
    exit("Acceso no permitido");
}
?>
