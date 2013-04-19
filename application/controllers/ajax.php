<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {

	public function index(){
		$query = $this->db->get('lat_lng');
		var_dump($query);
		$this->load->model('Block_model');
		// $data['content']= $this->Block_model->get_block();
		
		$this->load->view(PUBLIC_TEMPLATE_PATH."index", $data);
	}
	
	//Add marker only with lat, lng
	public function position_add(){
		$this->load->model('Ajax_model');
		echo $this->Ajax_model->insert_latlng();
	}
	
	//Add marker only with lat, lng
	public function position_update_info(){
		$this->load->model('Ajax_model');
		echo $this->Ajax_model->update_info();
	}
	
	public function position_update_latlng(){
		$this->load->model('Ajax_model');
		echo $this->Ajax_model->update_latlng();
	}
	
}
