<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {

	public function index(){
		$this->load->model('Block_model');
		$data['content']= $this->Block_model->get_block();
		
		$this->load->view(PUBLIC_TEMPLATE_PATH."index", $data);
	}
	public function block_test(){
		return "abc";
		$data['test']= "This test block in codeigniter";
		return $this->load->view(PUBLIC_TEMPLATE_PATH."test", $data, true);
	}
}
