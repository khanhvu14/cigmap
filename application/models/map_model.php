<?php
class Block_model extends CI_model {
    function __construct(){
        parent::__construct();
    }
	
	public function get_all_position(){
		
	}
	
    public function get_block() {
		$data['content']= "This test block in codeigniter";
		return $this->load->view(PUBLIC_BLOCK_PATH."test", $data, true);
    }
}

?>
