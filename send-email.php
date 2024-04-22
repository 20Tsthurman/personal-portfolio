<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'tannerky2024@gmail.com';
    $mail->Password = 'SECURE';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Recipients
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('tannerky2024@gmail.com', 'Tanner Thurman');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New message from portfolio website';
    $mail->Body = "Name: " . $_POST['name'] . "<br>Email: " . $_POST['email'] . "<br>Message: " . $_POST['message'];
    $mail->AltBody = 'Name: ' . $_POST['name'] . "\nEmail: " . $_POST['email'] . "\nMessage: " . $_POST['message'];

    error_log("Form data: " . print_r($_POST, true));

    $mail->send();
    echo 'Email sent successfully!';
} catch (Exception $e) {
    echo 'Failed to send email. Please try again later. Mailer Error: ' . $mail->ErrorInfo;
    error_log("Email sending failed. Error: " . $mail->ErrorInfo);
}
?>