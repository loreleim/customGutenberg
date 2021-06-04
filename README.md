
# customGutenberg
WP Blocks built with a dash of React
 
## Returning Blocks
How Wordpress teaches you vs. How React Devs do it

<details>
  <summary>Wordpress Version 🤮 (35 lines)</summary>
  
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


<details>
  <summary>React Dev version (15 lines)</summary>
  
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

## Creating Elements
How Wordpress teaches you vs. How React Devs do it


<details>
  <summary>Wordpress</summary>
  
```
var el = wp.element.createElement;
```
  
</details>


<details>
  <summary>React Dev</summary>
  
```
import { Component, Fragment } from '@wordpress/element';

class ButtonsEdit extends Component {
}
export default ButtonsEdit;
```
  
</details>

## Your Key imports
```
import { registerBlockType } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';
```

## File Setup
    .
    ├── ...
    ├── plugin.php
    ├── .gitignore              # ignore node_modules  
    ├── package.json            # don't create this file, it will be created during npm install  
    ├── src                     # Test files (alternatively `spec` or `tests`)
    │   ├── benchmarks          # Load and stress tests
    │   ├── integration         # End-to-end, integration tests (alternatively `e2e`)
    │   └── unit                # Unit tests
    └── ...

## npm install
`npm install @wordpress/scripts --save-dev`

## watch your files
`npm start`

## Development done? Time to build
`npm run build`

## Bibliography

[Here's a solid one that explains the save()](https://www.youtube.com/watch?v=sYHYTk0jeE8)

[A source that got me started on cleaner, nicer gutenberg](https://wordpress.stackexchange.com/questions/346562/file-structure-and-react-setup-when-creating-multiple-gutenberg-blocks)

[Understanding the difference between doing wp.create.element and <Fragments/>](https://www.youtube.com/watch?v=jauZCeLrGFA&ab_channel=ZacGordonZacGordon)

[GoDaddy really did the most for us with their coblocks plugin](https://github.com/godaddy-wordpress/coblocks)

[Install process](https://www.youtube.com/watch?v=8Jh707tR-0c&ab_channel=ZacGordonZacGordon)

[How to Register More than One Block](https://stackoverflow.com/questions/56045886/registering-multiple-custom-gutenberg-blocks-in-a-plugin-with-webpack-build)
