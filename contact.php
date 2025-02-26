<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    $to = "tucorreo@example.com";
    $subject = "Nuevo mensaje de contacto";
    $headers = "From: $email";

    mail($to, $subject, $mensaje, $headers);
    echo "Mensaje enviado correctamente.";
} else {
    echo "Hubo un error en el envío.";
}
?>
