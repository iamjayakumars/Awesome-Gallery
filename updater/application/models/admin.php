<?php

class Admin extends CI_Model {
    
    function login($username, $password) {
        $sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
        return $this->db->query($sql, array($username, $password))->num_rows() > 0;
    }
    
    function change_login_details($username, $password) {
        $sql = 'INSERT INTO admin (username, password) VALUES (?, ?)';
        $this->db->query($sql, array($username, $password));
    }
    
}

/* End of file login.php */