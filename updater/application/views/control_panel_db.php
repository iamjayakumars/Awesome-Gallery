<?php

class Control_Panel_DB extends CI_Model {
    
    function __construct() {
        $this->db->query('CREATE DATABASE IF NOT EXISTS ag_control_panel');
        $this->db->query('CREATE TABLE IF NOT EXISTS admin ()');
        $this->db->query('INSERT INTO admin (username, password) VALUES ("root", "123")');
    }
    
}

/* End of file control_panel_db.php */