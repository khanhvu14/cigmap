<html>
<head><title>SC</title></head>

<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<script type="text/javascript" src="<?php echo JS_PATH; ?>jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

<?php 
$this->load->model('Js_model'); 
echo Js_model::get_all_marker();
?>

<script type="text/javascript" src="<?php echo JS_PATH; ?>ContextMenu.js"></script>
<script type="text/javascript" src="<?php echo JS_PATH; ?>gmap_context_menu.js"></script>
<script type="text/javascript" src="<?php echo JS_PATH; ?>gmap.js"></script>

<link rel="stylesheet" media="screen" href="<?php echo CSS_PATH; ?>style.css">

<body>