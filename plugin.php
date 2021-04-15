<?php
/**
* Plugin Name: Custom Gutenberg Blocks
* Author: Lorelei Miyamura
* Description: A library of all custom gutenberg blocks
* Version: 1.0
*/

function bokoblocks() {

   //Register Style
   wp_register_style(
      'template-style',
        plugins_url( 'blocks/template/index.css', __FILE__ ),
        array( 'wp-edit-blocks')
    );

   // Register Build.js
   wp_register_script(
     'template-script',
       plugins_url( 'blocks/template/index.js', __FILE__ ),
       array( 'wp-blocks', 'wp-element')
   );

   // Register Block 1
   register_block_type( 'blocks/template', array(
      'style' => 'template-style',
      'editor_style' => 'template-style',
      'editor_script' => 'template-script',
   ) );
}
add_action( 'init', 'bokoblocks' );

?>