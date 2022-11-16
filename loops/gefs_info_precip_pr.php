<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Home</title>
<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" />
<link href="main.css" rel="stylesheet" type="text/css" media="all" />
<link href="fonts.css" rel="stylesheet" type="text/css" media="all" />
<script src="https://d3js.org/d3.v4.min.js"></script>
</head>

<?php
$randomtoken = base64_encode( openssl_random_pseudo_bytes(32));
$_SESSION['csrfToken']=$randomtoken;
?>

<body>
<u>All Images:</u>
<br>
The <font style="font-weight: bold" color="black">black line</font> represents the ensemble mean from NCEP's Global Ensemble Forecast System (GEFS). 
<br>
The <font style="font-weight: bold" color="red">red line</font> represents the ensemble mean from CMC's Global Ensemble Prediction System (GEPS).
<br>
The <font style="font-weight: bold" color="limegreen">green line</font> represents the ensemble mean from ECMWF'S Ensemble Prediction System (EPS).
</body>
</html>
