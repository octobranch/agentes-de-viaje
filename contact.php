<?php
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar reCAPTCHA
    $recaptchaSecret = 'TU_SECRET_KEY';
    $recaptchaResponse = $_POST['recaptcha_response'];
    
    $recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse";
    $recaptcha = json_decode(file_get_contents($recaptchaUrl));
    
    if (!$recaptcha->success || $recaptcha->score < 0.5) {
        header('Location: error.html?codigo=spam');
        exit;
    }

    // Configurar PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.tudominio.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'correo@tudominio.com';
        $mail->Password = 'tu_contraseña_segura';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        
        $mail->setFrom('no-reply@harmoniatours.com', 'Harmonia Tours');
        $mail->addAddress('contacto@harmoniatours.com');
        $mail->addReplyTo($_POST['email'], $_POST['nombre']);
        
        $mail->isHTML(true);
        $mail->Subject = "Nueva Consulta: " . htmlspecialchars($_POST['nombre']);
        $mail->Body = "
            <h2 style='color: #2a9d8f;'>Nueva Consulta</h2>
            <p><strong>Nombre:</strong> " . htmlspecialchars($_POST['nombre']) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>
            <p><strong>Mensaje:</strong></p>
            <div style='background: #f8f9fa; padding: 20px; border-radius: 8px;'>
                " . nl2br(htmlspecialchars($_POST['mensaje'])) . "
            </div>
        ";
        
        $mail->send();
        header('Location: gracias.html');
    } catch (Exception $e) {
        error_log("Error PHPMailer: " . $mail->ErrorInfo);
        header('Location: error.html?codigo=servidor');
    }
} else {
    header("HTTP/1.1 403 Forbidden");
    exit("Acceso no permitido");
}
?>
