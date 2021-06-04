
# customGutenberg
WP Blocks built with a dash of React
 
## Wordpress docs are outdated, lengthy and old

<details>
  <summary>How the docs teach you to write React blocks</summary>
  
  ```
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
  ```
</details>

That's 35 lines 🤮 of array formatted. Development handoff hell.

<details>
  <summary>How you should be writing your gutenberg blocks</summary>
  
 ```
   return (
      <div className={`notice-box notice` + attributes.type}>
         <div>
            <select onChange={updateType} value={attributes.type}></select>
            <option value={`default`}>Default</option>
            <option value={`success`}>Success</option>
            <option value={`danger`}>Danger</option>
         </div>
         <input type="text" 
         placeholder="Enter title here..." 
         value={attributes.title}
         onChange={updateTitle}></input>
         <RichText tagName={"p"} onChange={updateContent} value={attributes.content} placeholder={"Enter description here..."}></RichText>
    </div>
    );
  ```
  
</details>

15 lines of gorgeous, readable code!

## Bibliography

[Here's a solid one that explains the save()](https://www.youtube.com/watch?v=sYHYTk0jeE8)

[A source that got me started on cleaner, nicer gutenberg](https://wordpress.stackexchange.com/questions/346562/file-structure-and-react-setup-when-creating-multiple-gutenberg-blocks)

[How to Register More than One Block](https://stackoverflow.com/questions/56045886/registering-multiple-custom-gutenberg-blocks-in-a-plugin-with-webpack-build)
