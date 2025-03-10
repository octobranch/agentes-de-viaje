<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['mensaje']);
    
    $destinatario = "contacto@tudominio.com";
    $asunto = "Nueva consulta de Harmonia Tours";
    
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n\n";
    $cuerpo .= "Mensaje:\n$mensaje";
    
    $headers = "From: $email";
    
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        header('Location: gracias.html');
    } else {
        header('Location: error.html');
    }
} else {
    header('Location: index.html');
}
?>
