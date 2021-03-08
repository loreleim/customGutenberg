<?php
/**
* Plugin Name: Custom Gutenberg Blocks
* Author: Lorelei Miyamura
* Description: A library of all custom gutenberg blocks
* Version: 1.0
*/

// Loads things when the admin editor is active
function admin() {

   //Template
   wp_enqueue_script('template', plugins_url('/blocks/template/index.js', __FILE__), array( 'wp-blocks', 'wp-element' ));
   wp_enqueue_style('template', plugins_url( '/blocks/template/index.css', __FILE__ )); //this shows the style in the editor

   //Optimized
   wp_enqueue_script('optimized', plugins_url('/blocks/optimized/index.js', __FILE__), array( 'wp-blocks', 'wp-element' ));
   wp_enqueue_style('optimized', plugins_url( '/blocks/optimized/index.css', __FILE__ )); //this shows the style in the editor
}
add_action( 'enqueue_block_editor_assets', 'admin' );


//without this function, the styles won't load on the frontend
function frontend() {
   
   //Template
   wp_enqueue_style('template', plugins_url( 'blocks/template/index.css', __FILE__ ));

   //Optimized
   wp_enqueue_style('optimized', plugins_url( 'blocks/optimized/index.css', __FILE__ ));
}
add_action( 'wp_enqueue_scripts', 'frontend' );
?>

