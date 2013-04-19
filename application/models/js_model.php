<?php
class Js_model extends CI_model {
    function __construct(){
        parent::__construct();
    }
	
    public function get_all_marker() {
		$data['marker']= $this->db->get('sc_position')->result();
		return $this->load->view(PUBLIC_TEMPLATE_PATH."js/marker", $data, true);
    }
}

?>
