export default function save( { attributes } ) {

  var el = wp.element.createElement;

   return el( 'div', 
   { 
      className: 'notice-box notice-' + attributes.type
   }, 
   el(
      'h4', 
      null,
      attributes.title
   ),
   el( 
      wp.editor.RichText.Content, 
      {
         tagName: 'p',
         value: attributes.content
      }
   )

  ); // End return
 }
