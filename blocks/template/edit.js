var el = wp.element.createElement;

export default function edit({attributes, setAttributes}) {
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
}; // End edit()