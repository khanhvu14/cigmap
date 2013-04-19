<?php
class Block_model extends CI_model {
    // private $db;
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
	
    public function get_block() {
		$data['content']= "This test block in codeigniter";
		return $this->load->view(PUBLIC_BLOCK_PATH."test", $data, true);
    }
}

?>
