<?php
class Ajax_model extends CI_model {
    
    function __construct(){
        parent::__construct();
    }
	
    public function insert_latlng() {
		// $this->input->post('lat')= "123";
		// $this->input->post('lng')= "1323.132";
		
		$position = array(
			'id_position' => '' ,
			'id_user' => '1' ,
			'id_district' => '1' ,
			'id_city' => '1' ,
			'address' => 'My title' ,
			'lat' => $this->input->post('lat') ,
			'lng' => $this->input->post('lng') ,
			'description' => 'My Name' ,
			'note' => 'My title' ,
			'main_category' => '1' ,
			'status' => '1' ,
		);
		$this->db->insert('sc_position', $position); 
		return $this->db->insert_id();
    }
	
	
	
	//update only info of position
	public function update_info(){
		$id_position= 5;
		$position = array(
			'id_district' => '1' ,
			'id_city' => '1' ,
			'address' => 'Update' ,
			'description' => 'Update' ,
			'note' => 'Update' ,
			'main_category' => '8' ,
			'status' => '8' ,
		);

		$this->db->where('id_position', $id_position);
		return $this->db->update('sc_position', $position); 
	}
	
	
	//update only lat, lng
	public function update_latlng(){
		$id_position= $this->input->post('id_position');
		$position = array(
			'lat' => $this->input->post('lat') ,
			'lng' => $this->input->post('lng') ,
		);
		$this->db->where('id_position', $id_position);
		$this->db->update('sc_position', $position); 
		
		// echo $this->db->last_query();
		return $this->db->affected_rows();
	}
	
	
}

?>
