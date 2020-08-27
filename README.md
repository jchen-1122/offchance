# Off Chance Mobile

## Overview
### Styling Structure
Each component has its own folder, with the actual structure in ComponentName.js, and the styling in ComponentName.styling.js. There is also a folder in srcs/settings that holds global styles for the application. Every file in this folder is imported into all_settings.js and exported for use. To use these settings, just put `import {colors, fonts } from '../pathto/all_settings.js'` for whatever settings you want (currently there are colors, dimensions, fonts, and utilities). 

### App won't run?
* Did you start your backend?
* Did you pull from backend and frontend?
* Did you run `npm install`?
* Did you change IP_ADDRESS.json?
* Did you copy package.json from Github?
* Did you run `expo upgrade`?
* Did you use Stripe???

### Important Constants
* `admins`
    * located in src>components>pages>home>admin>admin_emails.json
    * list of emails for all the admin users
* `LDE_duration`
    * located in src>functions>raffle_functions
    * duration in minutes of the live drawing experience
* `opponents`
    * located in src>components>home>RPS>opponent_ids.json
    * list of user IDS in the database that will be selected as a rock paper scissors opponent


## Components
### Component Structure
The component structure is modeled after Brad Frost's [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).
The naming convention is based off of [Bem Naming](http://getbem.com/naming/), but instead it is `block__elem_mod`.