
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

## Make sure the plugin is working. 
The generated plugin should now be listed on the Plugins admin page in your WordPress install. Switch to the Wordpress admin dash. Go to the plugins page and activate. Create a new page and add the gutenberg block to it.

## Now before you start developing / making edits run
`npm start`

## Now everytime you make an edit (aka a new block), run:
`npm run build`

## But one block isn't enough. 
Agreed. The following steps will show you how to setup your plugin for multiple blocks.

- [ ] Copy the starter block file
- [ ] Delete everything in src except for index.js (this includes deleting: edit.js, save.js, editor.scss, style.scss)
- [ ] Replace the content of index.js with
```
import { registerBlockType } from '@wordpress/blocks';

import * as announcement from "./announcement";
import * as button from "./button";
import * as inspector from "./inspector";
import * as inspectorsave from "./inspectorsave";
import * as singlecard from "./singlecard";

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
    announcement,
    button,
    inspector, 
    inspectorsave, 
    singlecard
	].forEach( pullMetadata );
};

registerBlocks();
```

- [ ] Delete the following files
.editorconfig

- [ ] replace gutenpride.php with
```
<?php
/**
 * Plugin Name:       Gutenpride
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenpride
 *
 * @package           create-block
 */


function initializeBlocks() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'initializeBlocks' );
```

### Yeah everything should work now

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

## npm install
`npm install @wordpress/scripts --save-dev`

This will create dependencies in package.json.
It requires node 10.0.0 + and npm 6.9.0 + 

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
