<?php

/**
 * Plugin Name: Awesome Gallery
 * Plugin URI: 
 * Description: Embeds Awesome Gallery into your galleries.
 * Version: 0.1
 * Author: Daniel Desira
 * License: GPL2
 */

add_filter( 'the_posts', 'dd_ag_post_embed' );

function dd_ag_post_embed( $posts ) {
  foreach ($posts as $post) {
    if (strpos( $post->post_content, '[gallery' ) !== FALSE) {
      $plugin_url = plugin_dir_url( __FILE__ );
      wp_enqueue_style( 'style', $plugin_url . 'css/layout.css' );
      wp_enqueue_script( 'core', $plugin_url . 'js/viewer.js', array(), '0.5', TRUE );
      wp_enqueue_script( 'launcher', $plugin_url . 'js/main.js', array( 'core' ), '', TRUE );
      return $posts;
    }
  }
  return $posts;
}

add_filter( 'the_content', 'dd_ag_load_flyout' );

function dd_ag_load_flyout( $content ) {
  load_template( plugin_dir_path( __FILE__ ) . 'templates/flyout.html' );
  return $content;
}

?>
