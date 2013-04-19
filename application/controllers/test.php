<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {

	public function index(){
		// echo base_url();
		// $query = $this->db->get_where('lat_lng', array("id"=> 124), 2, 0)->result();
		// echo "<pre>";
		// var_dump($query);
		// $this->load->helper('gmap');
		// echo gmap_test();

		$this->load->model('Block_model');
		$data['content']= $this->Block_model->get_block();
		
		$this->load->view(PUBLIC_TEMPLATE_PATH."index", $data);
	}
	public function block_test(){
		
		$data['test']= "This test block in codeigniter";
		return $this->load->view(PUBLIC_TEMPLATE_PATH."test", $data, true);
	}
}
