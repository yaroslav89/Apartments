<?php 
//header('location: ../add.html');
require 'Class.php';
echo "<a href='../add.html'>Back</a>";
$json = new AddjsnObject('../js/json/apartments.json');
$json->upload($_FILES['apartment_foto']);
$json->name = $_POST['apartment_name'];
$json->price = $_POST['apartment_price']."$";
$json->push_data();
?>