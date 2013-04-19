<script>
var root_url= "<?php echo base_url(); ?>";
function get_all_marker(){
	var marker= [
	<?php foreach($marker as $val){ ?>
		[<?php echo $val->lat; ?>, <?php echo $val->lng; ?>, "information 1", "<?php echo $val->id_position; ?>"],
	<?php } ?>
	];
	
	return marker;
}
</script>