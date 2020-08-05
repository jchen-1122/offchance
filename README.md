# Off Chance Mobile

## For Dev
### Component Structure
The component structure is modeled after Brad Frost's [Atomic Design] (https://bradfrost.com/blog/post/atomic-web-design/)
### Styling Structure
Each component has its own folder, with the actual structure in ComponentName.js, and the styling in ComponentName.styling.js. There is also a folder in srcs/settings that holds global styles for the application. Every file in this folder is imported into all_settings.js and exported for use. To use these settings, just put `import {colors, fonts } from '../pathto/all_settings.js'` for whatever settings you want (currently there are colors, dimensions, fonts, and utilities). 

### App won't run?
* Did you start your backend?
* Did you pull from backend and frontend?
* Did you run `npm install`?
* Did you change IP_ADDRESS.json?
* Did you copy package.json from Github?
* Did you run `expo upgrade`?
