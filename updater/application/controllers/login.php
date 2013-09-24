<?php

class Login extends CI_Controller {
    
    function index() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $this->load->model('control_panel_db');
        $this->load->model('admin');
        
        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');
        
        if ($this->form_validation->run() === FALSE) {
            $this->load->view('login');
        } else if ($this->admin->login($this->input->post('username'), $this->input->post('password'))) {
            $this->load->view('admin');
        } else {
            $this->load->view('login');
        }
    }
    
}

/* End of file login.php */
