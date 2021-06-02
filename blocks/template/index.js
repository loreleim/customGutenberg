//doing an import here breaks the code

var el = wp.element.createElement;
wp.blocks.registerBlockType('loreleim/template', {
 title: 'Testing',  // Block name visible to user
 icon: 'smiley', // Toolbar icon can be either using WP Dashicons or custom SVG
 category: 'common', // Under which category the block would appear
 attributes: {   // The data this block will be storing
  type: { type: 'string', default: 'default' },   // Notice box type for loading the appropriate CSS class. Default class is 'default'.
  title: { type: 'string' },   // Notice box title in h4 tag
  content: { type: 'array', source: 'children', selector: 'p' }  /// Notice box content in p tag
 },
 edit({attributes, setAttributes}){
  // How our block renders in the editor in edit mode
 
  function updateTitle( event ) {
     setAttributes( { title: event.target.value } );
  }
  function updateContent( newdata ) {
     setAttributes( { content: newdata } );
  }
  function updateType( event ) {
     setAttributes( { type: event.target.value } );
  }
  return el( 'div', 
     { 
        className: 'notice-box notice-' + attributes.type
     }, 
     el(
        'select', 
        {
           onChange: updateType,
           value: attributes.type,
        },
        el("option", {value: "default" }, "Default"),
        el("option", {value: "success" }, "Success"),
        el("option", {value: "danger" }, "Danger Zone")
     ),
     el(
        'input', 
        {
           type: 'text', 
           placeholder: 'Enter title here...',
           value: attributes.title,
           onChange: updateTitle,
           style: { width: '100%' }
        }
     ),
     el(
        wp.editor.RichText,
        {
           tagName: 'p',
           onChange: updateContent,
           value: attributes.content,
           placeholder: 'Enter description here...'
        }
     )   
  ); // End return
 }, // End edit()
 save({attributes}) {
  // How our block renders on the frontend
 
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
    
 } // End save()
});