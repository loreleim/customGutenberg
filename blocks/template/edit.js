export const edit = (props) => {
  // How our block renders in the editor in edit mode
 
  function updateTitle( event ) {
     props.setAttributes( { title: event.target.value } );
  }
  function updateContent( newdata ) {
     props.setAttributes( { content: newdata } );
  }
  function updateType( event ) {
     props.setAttributes( { type: event.target.value } );
  }
  return el( 'div', 
     { 
        className: 'notice-box notice-' + props.attributes.type
     }, 
     el(
        'select', 
        {
           onChange: updateType,
           value: props.attributes.type,
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
           value: props.attributes.title,
           onChange: updateTitle,
           style: { width: '100%' }
        }
     ),
     el(
        wp.editor.RichText,
        {
           tagName: 'p',
           onChange: updateContent,
           value: props.attributes.content,
           placeholder: 'Enter description here...'
        }
     )   
  ); // End return
}; // End edit()