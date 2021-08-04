
# customGutenberg
WP Blocks built with a dash of React
 
## Returning Blocks
How Wordpress teaches you vs. How React Devs do it

<details>
  <summary>Youtube Tutorial Version 🤮 (35 lines)</summary>
  
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
How YouTube Tutorials Teach You vs. How React Devs do it


<details>
  <summary>Youtube Tutorials</summary>
  
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

## Where to start?

For now starting from gutenpride is going to be your best bet. cd into your plugins directory and run
```
npx @wordpress/create-block gutenpride
```

Hit (y) in the terminal to install @wordpress/create-block. If you run into an error on the `npx ... gutenpride` step. You probably have the wrong version of node. [Here's a guide on updating it.](https://nodejs.org/en/download/package-manager/) Give it 5-10 minutes (it'll install a bunch of npm dependencies) to install and create the folder. I've noticed it depends on your internet speed.

## Name your plugin!

The following files are places you would want to change gutenpride -> to your plugin name or namespace.
```
main gutenpride folder
gutenpride.php              //line 3, 4, 8, 11, 23 & 26
block.json 		    //line 12
```
Once you edit the namespaces, the changes should appear immediately in the plugin admin. If not, refresh the page to see the changes.

## Make sure the plugin is working. 
The generated plugin should now be listed on the Plugins admin page in your WordPress install. Switch to the Wordpress admin dash. Go to the plugins page and activate. Go back to the WP Pages menu, create a new page and add the gutenberg block to it. The default block is named gutenberg with a smiley face icon.

## Now its time to restructure
This restructuring makes gutenpride more component friendly. It also allows us to create multiple blocks in the same plugin!
1. create a folder in src > call it "default"
2. Move block.json, edit.js, editor.scss, index.js, save.js, and style.scss into the new "default" folder
3. in the src folder > create a file > name it "index.js"
4. Copy the content below, and paste it into index.js

```
import { registerBlockType } from '@wordpress/blocks';

import * as defaultBlock from "./default";

const pullMetadata = ( block ) => {

	let { category } = block;

	const { name, settings } = block;

	registerBlockType( name, {
		category,
		...settings,
	} );
};

export const registerBlocks = () => {
	[
    defaultBlock
	].forEach( pullMetadata );
};

registerBlocks();
```

5. In plugin.php or gutenpride.php or "namespace".php. Replace lines 16-19 with the following: 
```
function initializeBlocks() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'initializeBlocks' );
```

6. In the scr > default > block.json. Replace all the content with the following
```
{
	"apiVersion": 2,
	"name": "gutenbergcontrols/default",
	"title": "Default Block",
	"category": "widgets",
	"icon": "smiley",
	"description": "Gutenberg Default Block",
	"attributes": {
		"items": {
			"type": "number",
			"default": "default"
		}
	},
	"textdomain": "pluginname",
	"editorScript": "./build/index.js",
	"editorStyle": "./build/index.css",
	"style": "./build/style-index.css"
}
```

7. In the scr > default > edit.js
```
import './editor.scss';
import { InspectorControls, RichText } from "@wordpress/block-editor";
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl, ButtonGroup, Button } from "@wordpress/components";

export default function edit ({ attributes, setAttributes }) {

  function updateHeaderAttribute(passedValue) {
    setAttributes({header: passedValue})
  }

  return (
    <Fragment>

        <div className="cardContainer">
          <RichText value={attributes.header} placeholder={"Add Title"} tagName="h1" onChange={updateHeaderAttribute}/>
        </div>

      <InspectorControls>

        {/*Text Control*/}
        <PanelBody title="Text" initialOpen={true}>
          <TextControl 
          label="Header" 
          value={attributes.header}
          onChange={updateHeaderAttribute} />
				</PanelBody>

        {/*ButtonGroup*/}
        <PanelBody title="Button Group" initialOpen={true}>
          <ButtonGroup>
            <Button variant="primary">25%</Button>
            <Button variant="primary">50%</Button>
            <Button variant="primary">75%</Button>
            <Button variant="primary">100%</Button>
          </ButtonGroup>
				</PanelBody>

			</InspectorControls>

    </Fragment>
  )
}
```
7. editor.scss is okay, just delete the notations if you'd like
8. index.js replace everything with
```
import './style.scss';
import metadata from "./block.json";
import edit from './edit';
import save from './save';

const {name, category, attributes} = metadata;

const settings = {
  title: "Default Block",
  description: "a block that shows an annoucement",
  icon: "smiley",
  attributes,
  edit,
	save,
}

export {name, category, metadata, settings};
```
9. Replace save.js with the following:
```
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{( 'Gutenpride – hello from the saved content!', 'gutenpride' ) }
		</p>
	);
}
```
10. Add a block.json into the gutenbergcontrols / main directory of your folder with the following content: 
```
{
	"apiVersion": 2,
	"name": "create-block/gutenbergcontrols",
	"title": "Gutenpride",
	"category": "widgets",
	"icon": "smiley",
	"description": "Example block written with ESNext standard and JSX support – build step required.",
	"supports": {
		"html": false
	},
	"textdomain": "gutenpride",
	"editorScript": "file:./build/index.js",
	"editorStyle": "file:./build/index.css",
	"style": "file:./build/style-index.css"
}
```
11. Run `npm run build`

## npm install
`npm install @wordpress/scripts --save-dev`

This will create dependencies in package.json.
It requires node 10.0.0 + and npm 6.9.0 + 

## Once that's done, make sure to rebuild!
You can achieve this with `npm run build`

## Ways to structure your components

<details>
  <summary>React Component</summary>
  
```
import { Component } from '@wordpress/element';

export default class ButtonsEdit extends Component {
  render() {
    return (
      <div>
        <h1>Button Test</h1>
      </div>
    )
  }
}
```
  
</details>


<details>
  <summary>Functional Component w/Props</summary>
  
```
export default function edit ({ attributes, setAttributes }) {
  return (
    <div>
    </div>
  )
}
```
  
</details>

## watch your files
`npm start`

## Development done? Time to build
`npm run build`

<details>
  <summary>Cannot destructure property `writeFile` of 'undefined' or 'null'. gutenpride</summary>
  Check your node version. WP-Scripts and Guten can only run on node 10.0.0 +. you can check this with `node -v`
</details>

## Debugging
To debug, open up a console in your wp post / page admin. You can run this script in Google Dev tools or Firefox.

If you want to count how many blocks on a page:
```
wp.data.select( 'core/block-editor' ).getBlockCount();
```

If you want to "console.log()" attributes being passed around, run this command
```
wp.data.select( 'core/block-editor' ).getSelectedBlock().attributes;
```


## Your Key imports
```
import { registerBlockType } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';
import { getBlockType } from '@wordpress/blocks';
import { InspectorControls } from "@wordpress/block-editor"; //appears in the sidebar when a block is being edited
import { Component } from '@wordpress/element';
import { Fragment } from '@wordpress/element';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
```


## Development: Making Edits
Anytime you want to create a new block or make edits. 

open up the directory and run a 
```
npm start
```

## Developement: New Blocks
The files you'd want to copy are
```
    .
    ├── ...
    ├── src
    │   ├── yourblockfolder         # "yourblockfolder" should be the name of your bloc
    │   │   block.json          # this is where block metadata is stored
    │   │   edit.js             # WP admin display
    │   │   editor.scss         # Styling that only shows up in WP Admin
    │   │   index.js            # name, category, metadata, settings
    │   │   save.js             # Frontend Display
    │   └──   style.scss        # Frontend Styles
    │   ├── index.js            # don't do anything here, this is just for reference for the second step
    └── ...
 ```
Add these lines in the src's index.js
```
import { registerBlockType } from '@wordpress/blocks';     //this should already be here

import * as yourblockfolder from "./inspector";            //add this

const pullMetadata = ( block ) => {

	let { category } = block;

	const { name, settings } = block;

	registerBlockType( name, {
		category,
		...settings,
	} );
};

export const registerBlocks = () => {
	[
    //if you had a second block it would go here
    yourblockfolder                                       //add this
	].forEach( pullMetadata );
};

registerBlocks();
```

## Development: Block Sidebar
```
import './editor.scss';
import { InspectorControls } from "@wordpress/block-editor";
import { Fragment } from '@wordpress/element';
import { PanelBody, FormToggle} from "@wordpress/components";

export default function edit({ attributes, setAttributes }) {

  const {show} = attributes;
  console.log(show);

	return (
		<Fragment>
      <h1>Inspector</h1>
      <InspectorControls>
				<PanelBody title="Settings">
					<FormToggle
						label="Should text be shown?"
						help={show ? "Yes" : "No"}
						checked={show}
						onChange={() => setAttributes({ show: !show })}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
```

Types of Controls you can add in Inspector Controls
1. [Form Toggle](https://developer.wordpress.org/block-editor/reference-guides/components/form-toggle/#design-guidelines) (similar to Toggle Control. i would actually use Toggle Control > Form Toggle because you can add labels)
1. [Toggle Control](https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/)

## Config a Block Preview
```
const settings = {
  title: "Repeater",
  description: "a repeater",
  icon: "admin-settings",
  attributes,
  example: {}, //add this line here
  edit,
  save,
}
```

## Bibliography

[Wordpress Block Official Docs, Starting Point](https://developer.wordpress.org/block-editor/how-to-guides/)

[Customize the Gutenberg Sidebar Settings](https://wpblockz.com/tutorial/how-to-code-the-inspector-controls/)

[Starting from Gutenpride](https://developer.wordpress.org/block-editor/handbook/tutorials/create-block/wp-plugin/)

[Here's a solid one that explains the save()](https://www.youtube.com/watch?v=sYHYTk0jeE8)

[A source that got me started on cleaner, nicer gutenberg](https://wordpress.stackexchange.com/questions/346562/file-structure-and-react-setup-when-creating-multiple-gutenberg-blocks)

[Understanding the difference between doing wp.create.element and <Fragments/>](https://www.youtube.com/watch?v=jauZCeLrGFA&ab_channel=ZacGordonZacGordon)

[GoDaddy really did the most for us with their coblocks plugin](https://github.com/godaddy-wordpress/coblocks)

[Install process](https://www.youtube.com/watch?v=8Jh707tR-0c&ab_channel=ZacGordonZacGordon)

[How to Register More than One Block](https://stackoverflow.com/questions/56045886/registering-multiple-custom-gutenberg-blocks-in-a-plugin-with-webpack-build)

[GSAP in Blocks](https://www.youtube.com/watch?v=bMrI3nManuc)

[How to use Flex in Innerblocks](https://wordpress.stackexchange.com/questions/390696/innerblocks-breaks-flexbox-and-css-grid-styles)
